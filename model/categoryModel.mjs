import mongoose, { Mongoose } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    user:{
        type:Boolean,
        require:true
    }
},{timestamps:true})

export default mongoose.model('categories', categorySchema);