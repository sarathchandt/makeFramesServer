import mongoose, { Schema } from "mongoose";



const programSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true
    },
    selectedDaates: {
        type: [],
        require: true
    },
    category: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },

    description: {
        type: String,
        require: true
    },
    imageArray: {
        type: [], 
        require: true
    },
    vdoFile: {
        type: String,
        require: true
    },
    booking:{
        type:[]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    },
    bookingCount:{
        type:Number,
        default:0
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
   
})

export default mongoose.model('Programs',programSchema)