import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,   
        // required: false,  
    },
    email: {
        type:String,
        required:true
    }, 
    password:   {
        type:String,
        required:true
    },
    isArtist:{
        type:Boolean,
        default:false
    },
    dpimage:{ 
        type:String
    },
    about:{
        type:String,
    },
    domain:{
        type:String,
        default:'nothing'
    },
    bookings:{
        type:[]
    },
    hype:{
        type:[] 
    },
    connection:{
        type:[]
    },
    hypeCount:{
        type:Number,
        default:0
    },
    MessagedPeople:{
        type:[],
        require:true
    },
    isProducer:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
 
 

},{timestamps:true})

export default mongoose.model('Users',signupSchema)