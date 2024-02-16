import mongoose from "mongoose";

const url = process.env.MONGODB;

const connectMongoDb = async ()=>{
    try{
        await mongoose.connect(url)
        console.log("MongoDB Connected!");
    }catch(err){
        console.log(err);
    }
}

export default connectMongoDb;