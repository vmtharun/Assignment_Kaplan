import mongoose from "mongoose";

export class DbConfig {
    private static mongoUrl: string = 'mongodb://mongo:27017/myAssignment'; 

    public  static mongoSetup(){
        mongoose.connect(this.mongoUrl, { useNewUrlParser : true})
        .then(() => {
            console.log("connection successful");
        })
        .catch(error => {
            console.log(error);
            console.log("connection failed");
        });
    }
}