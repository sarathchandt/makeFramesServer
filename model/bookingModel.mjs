import mongoose, { Types }  from "mongoose";

const bookSchema = new mongoose.Schema({
    program_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Programs'
    },
    date:{
            type:String,
            require:true
        },
    time:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    mob:{
        type:String,
        require:true
    },
    mark:{
        type:{},
        require:true
    },
    currentLocation:{
        type:{},
        require:true
    },
    userID:{
        type:String,
        require:true 
    },
    isAccepted:{  
        type:Boolean,
        default:false
    },
    hostedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rejected:{
        type:Boolean,
        default:false
    }



},{timestamps:true})

export default mongoose.model('bookings', bookSchema);