import mongoose, { model, Schema, Types } from "mongoose";


const orderSchema = new Schema({

userId:{
   type:Types.ObjectId,
    ref:'User',
    required:true,
},
version:[
{
    versionName:{
type:String,
required:true
    },
versionId:{
  type:Types.ObjectId,
    ref:'Version',
    required:true
},
quantity:{
    type:Number,
    default:1
},
unitPrice:{
    type:Number,
        required:true

},
finalPrice:{
     type:Number,
    required:true
}
}

],
phoneNumber:{
    type:String,
required:true,
},
address:{
type:String,
required:true,
},
createdBy:{
    type:Types.ObjectId,
    ref:'User'
},apdatedBy:{
   type:Types.ObjectId,
    ref:'User'
}





});

const orderModel =mongoose.models.Order|| model("Order",orderSchema);

export default orderModel;