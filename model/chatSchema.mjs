import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatUsers:{
        type:[],
        require:true
    },
    message:{
        type:String,
        require:true

    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
},{timestamps:true})

export default mongoose.model('chats',chatSchema)