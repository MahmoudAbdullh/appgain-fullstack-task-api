import { Request,Response,NextFunction } from "express";
import { validationResult } from 'express-validator';
import path from 'path';
import rimraf from 'rimraf';
import LayoutModel from '../../model/Layout';
import { MulterUploader ,CloudinaryUploader} from './UploadToCloud';

const InitLayout =
[
    async(req: Request, res: Response, next: NextFunction)=>{
        try {
            let data = await LayoutModel.findOne()
            res.json({
                success : true,
                data
            })

        } catch (error) {
            res.status(500).json({
                message: "faild",
                errors: error
            })

        }

    }
]



const UpdateLayout =
[
    new MulterUploader('slides').Upload(),
    async(req: Request, res: Response, next: NextFunction)=>{
        try {
            let validationR = validationResult(req.body);
            let CWD = process.cwd()
            let files:any = req.files;
            //send errors
            if(!validationR.isEmpty()) return res.json({success: false , errors :validationR.array()})

            let cloudinaryEngine = new CloudinaryUploader({
                cloud_name: process.env.cloud_name || '',
                api_key: process.env.api_key || '',
                api_secret: process.env.api_secret || '',
                provisioning_api_key:"",
                provisioning_api_secret:""
            }, "appgain_task");

            let uploadSlidesResult = await cloudinaryEngine.UploadArray(files['slides'])
            let uploadLogoResult = await cloudinaryEngine.UploadSingle(files['logo'][0])

            /**
             * clear
             */
            rimraf(path.join(CWD,"uploads/*"), (err)=>{
                if(!err)
                    console.log('uploads is empty');
                else console.log("error While empty uploads folder");
            });

            if(uploadSlidesResult&& uploadLogoResult){
                //update
                LayoutModel.findByIdAndUpdate(req.body.id,{
                    ...req.body,
                    logo : uploadLogoResult,
                    $push: {
                        slides: {$each: uploadSlidesResult}
                    }
                },{new: true},(err,doc)=>{
                    if(doc){
                        res.json({
                            success: true,
                            data: doc
                        })
                    }else{
                        res.json({
                            success: false,
                            error: err
                        })
                    }
                });

            }else{

                res.json({
                    success : false,
                    data: 'Faild'
                })
            }


        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "faild",
                errors: error
            })

        }

    }
]

export {
    InitLayout,
    UpdateLayout
}
