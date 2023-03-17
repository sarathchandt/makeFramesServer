import mongoose from 'mongoose'

 export default { connect:  ()=>{
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB,(()=>{console.log("ok");}))
 }
   
}

  


