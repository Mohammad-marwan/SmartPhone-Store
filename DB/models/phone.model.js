import mongoose, { model, Schema, Types } from "mongoose";


const phoneSchema = new Schema({

name:{
type:String,
   required:true,
   max:20,
   min:3
},slug:{
    type:String,
    required:true
},status:{
    type:String,
    enum:["active","notActive"]
},image:{
    type:Object,
},createdBy:{
    type:Types.ObjectId,
    ref:'User'
},apdatedBy:{
   type:Types.ObjectId,
    ref:'User'
}





});

const phoneModel =mongoose.models.Phone|| model("Phone",phoneSchema);

export default phoneModel;