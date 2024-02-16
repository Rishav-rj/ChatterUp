import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    user:{
        type:String,
        require:true,
    },
    text:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
})


const chatsModel = mongoose.model("Chat", chatSchema)

export default chatsModel;