import slugify from "slugify";
import phoneModel from "../../../DB/models/phone.model.js";
import cloudinary from "../../utils/cloudinary.js";
import versionModels from "../../../DB/models/version.model.js";

export const create = async(req,res)=>{
const {name ,phoneId} = req.body;

const checkPhone = await phoneModel.findById(phoneId);
if(!checkPhone){
res.status(404).json({message:"phone not found"})
}
req.body.slug =slugify(name);


const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path);
req.body.subImage = []
if(req.files.subImage){
    for(const file of req.files.subImage){
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path);
             req.body.subImage.push({secure_url,public_id})
    }
}


req.body.mainImage = {secure_url,public_id};
req.body.createdAy = req.id;
req.body.apdatedAy = req.id;

const phone = await versionModels.create(req.body);

return res.status(201).json({message:"success",phone});


}


export const getAll = async(req, res)=>{

const phone = await versionModels.find({}).select('name mainImage price discount');

if(!phone){
    return res.status(400).json({message:"phone not found"})
}

return res.status(400).json({message:"success",phone})

}

export const getActive = async(req, res)=>{
const phone = await versionModels.find({status:"active"});

if(!phone){
    return res.status(400).json({message:"phone not found"})
}

return res.status(400).json({message:"success",phone})

}

export const getDetails = async(req, res)=>{
    const {id} = req.params
const phone = await versionModels.findById(id).populate('review');

if(!phone){
    return res.status(400).json({message:"phone not found"})
}

return res.status(400).json({message:"success",phone})

}


export const remove = async(req,res)=>{
   const {id} = req.params;
   const phone = await versionModels.findByIdAndDelete(id);
    if(!phone){
        return res.status(400).json({message:"phone not found"});
    }
    await cloudinary.uploader.destroy(phone.mainImage.public_id)

    return res.status(200).json({message:"success"});
}