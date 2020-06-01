import mongoose from 'mongoose';

export default async () =>{
    try {
        await mongoose.connect(
            process.env.DB_URL || '',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify : false
            },
            (e)=>{
                if(e) throw e;
                console.log('<< DB connected >>');
            })
    } catch (e) {
        console.log('connection Error :',e);

    }
}
