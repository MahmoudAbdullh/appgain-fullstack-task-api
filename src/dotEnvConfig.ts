import dotenv from 'dotenv'
import Path from 'path'
export default async () =>{
    try {

        let path;
        switch (process.env.NODE_ENV) {
            case "production":
                path = Path.join(__dirname,'../','.env');
                break;
            default:
                path = Path.join(__dirname, '../', '.env.development');
        }
        dotenv.config({ path: path });

    } catch (e) {
        console.log('dot env config Error :',e);

    }
}
