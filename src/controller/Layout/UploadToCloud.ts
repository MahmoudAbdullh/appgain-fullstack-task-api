import { Request} from "express";
import Multer from 'multer';
import cloudinary,{ConfigOptions, UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';

export class MulterUploader {
    private fieldName : string
    constructor(fieldName:string) {
        this.fieldName = fieldName || 'files'
    }
    private storage(){
        return Multer.diskStorage({
            destination: function (req: Request, file: any, cb: any) {
                cb(null, 'uploads/')
            },
            filename: function (req: Request, file: any, cb: any) {
                let ext = file.originalname.split(".").pop();
                cb(null, file.fieldname + '-' + Date.now() + "." + ext)
            }
        })
    }
    Upload(){
        return Multer({ storage: this.storage(), preservePath: true }).fields([{name:this.fieldName},{name:"logo"}])//(this.fieldName)
    }
}


export class CloudinaryUploader {
    private config : ConfigOptions;
    private upload_preset : string;
    private cloudinary : any;
    constructor(config: ConfigOptions, upload_preset:string) {
        this.config = config
        this.cloudinary = cloudinary.v2
        this.upload_preset = upload_preset || "appgain_task"
        this.Setup()
    }
    private Setup() {
        this.cloudinary.config(this.config)
    }
    /**
     *
     */
    UploadArray(files: any){

        return new Promise((resolve: Function, reject: Function) => {
            let length:number = files.length;
            let uploadedFiles: object[] = [];

            files.map(async(file:any, idx:number)=>{
                await this.cloudinary.uploader.upload(
                    file.path,
                    {upload_preset:this.upload_preset
                }).then((result:UploadApiResponse)=>{
                    uploadedFiles.push({
                        src: result.secure_url,
                        altText: file.originalname
                    })
                    if(idx+1 === length){
                        //return result
                        return resolve(uploadedFiles)
                    }
                }).catch((error: UploadApiErrorResponse)=>{
                    return reject(error)
                })
            })

        })
        .then(result=>result)
        .catch(error=>error);
    }

    /**
     *
     */
    UploadSingle(file: any){

        return new Promise((resolve: Function, reject: Function) => {
            this.cloudinary.uploader.upload(
                file.path,
                {upload_preset:this.upload_preset},
                async(error:UploadApiErrorResponse, result: UploadApiResponse)=> {
                    if(result){
                        return resolve(result.secure_url)
                    }
                    if(error){
                        return reject(error)
                    }
            }).catch((error: UploadApiErrorResponse)=>{
                return reject(error)
            })
        })
        .then(result=>result)
        .catch(error=>error);
    }
}