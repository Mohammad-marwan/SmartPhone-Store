import mongoose, { model, Schema, Types } from "mongoose";


const  reviewSchema = new Schema({

comment:{
type:String,
   required:true,
},rating:{
    type:Number,
    required:true,
    min:1,
    max:5
},createdBy:{
    type:Types.ObjectId,
    ref:'User'
},versionId:{
  type:Types.ObjectId,
    ref:'Version',
    required:true
}
});

const reviewModel =mongoose.models.review|| model("review",reviewSchema);

export default reviewModel;