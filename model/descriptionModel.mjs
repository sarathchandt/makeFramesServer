import mongoose from "mongoose";

const descSchema = new mongoose.Schema({
    desc:{
        type:String,
        require:true
    },
    current:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

export default mongoose.model('descriptions', descSchema)