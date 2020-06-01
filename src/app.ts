import express from "express";
import Logger from 'morgan';
import Cors from 'cors';
import dotEnvConfig from './dotEnvConfig'
/**
 *
 */
import IndexR from './routes/index'
export default class Application {

    app: express.Application;
    constructor() {
        this.app = express();
        this.setting();
        this.middleWares();
        this.routes()
    }
    /**
     * Settings
     */
    private setting(){
        dotEnvConfig();
        this.app.set('port',process.env.PORT || 3000);
    }
    /**
     * middle wares
     */
    private middleWares(){
        this.app.use(Cors())
        this.app.use(Logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    /**
     * routes
     */
    private routes(){
        this.app.use('/api/',IndexR)
        /**
         * error handling
         */
    }
    /**
     * run
     */
    start() {
        try {
            this.app.listen(this.app.get('port'), () => {
                console.log("<< server runing >> ",this.app.get('port'));
            });
        } catch (error) {
            console.log(error);
        }
    }
}
