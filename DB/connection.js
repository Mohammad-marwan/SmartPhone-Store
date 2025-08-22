import mongoose from "mongoose"

const connectDB = async()=>{

return await mongoose.connect(process.env.DB).then(()=>{

    console.log("database connection ...")

}).catch((error)=>{
      console.log(`error to connect database : ${error}`)

})

}

export default connectDB;