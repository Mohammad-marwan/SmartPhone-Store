import mongoose, { model, Schema, Types } from "mongoose";

const versionSchema = new Schema({
name:{
   type:String,
   required:true,
   unique:true,
   trim:true,
   max:20,
   min:3
},
description:{
 type:String,
   required:true
},
stock:{
    type:Number,
    default:1
},
price:{
 type:Number,
   required:true
},
discount:{
    type:Number,
    default:0
},mainImage:{
    type:Object,
 required:true
},
subImage:[{
    type:Object,
}],
status:{
    type:String,
    enum:["active","notActive"]
},
slug:{
    type:String,
    required:true
},createdAy:{
    type:Types.ObjectId,
    ref:'User'
},apdatedAy:{
   type:Types.ObjectId,
    ref:'User'
},
phoneId:{
    type: Types.ObjectId, // ✅ صحيحة
    ref: 'Phone'
}
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

versionSchema.virtual('review',{
ref:'review',
localField:'_id',
foreignField:'versionId'
})

const versionModels = mongoose.models.version || model("Version",versionSchema);

export default versionModels;