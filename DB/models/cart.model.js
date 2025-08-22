import mongoose, { model, Schema, Types } from "mongoose";


const cartSchema = new Schema({

userId:{
   type:Types.ObjectId,
    ref:'User',
    required:true,
    unique:true

},

version:[
{
versionId:{
  type:Types.ObjectId,
    ref:'Version',
    required:true
},
quantity:{
    type:Number,
    default:1
}
}

],
createdBy:{
    type:Types.ObjectId,
    ref:'User'
},apdatedBy:{
   type:Types.ObjectId,
    ref:'User'
}





});

const cartModel =mongoose.models.Cart|| model("Cart",cartSchema);

export default cartModel;