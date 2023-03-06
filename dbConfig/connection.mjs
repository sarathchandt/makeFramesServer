import mongoose from 'mongoose'

 export default { connect:  ()=>{
  console.log(process.env.DB);
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB,(()=>{console.log("ok");}))
 }
}

  


