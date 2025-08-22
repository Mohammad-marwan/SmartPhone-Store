import slugify from 'slugify';
import phoneModel from '../../../DB/models/phone.model.js';


export const create = async (req,res)=>{
    const {name} = req.body;
    const slug = slugify(name)
    const userId = req.id;

    const phone = await phoneModel.create({name , slug ,createdBy:userId,createdBy:userId})
    return res.status(200).json({message:"success",phone});


}

export const get = async(req,res)=>{

    const phone = await phoneModel.find({});

    return res.status(200).json({message:"success",phone});

}

export const getActive = async(req,res)=>{

    const phone = await phoneModel.find({status:"active"});

    return res.status(200).json({message:"success",phone});

}

export const deleted = async (req,res)=>{

    const {id} = req.params;

    const phone = await phoneModel.findByIdAndDelete(id);
    if(!phone){
        return res.status(400).json({message:"phone not found"});
    }

    return res.status(200).json({message:"success"});


}

export const update = async (req,res)=>{

    const {id} = req.params;
    const {name}=req.body;
  const {status}=req.body;

    const userId = req.id;
    const phone = await phoneModel.findById(id);
    if(!phone){
        return res.status(400).json({message:"phone not found"});
    }
    phone.name = name;
    phone.apdatedBy = userId;
    phone.slug = slugify(name);
    phone.status = status;
    await phone.save();
    return res.status(200).json({message:"success"});
}

export const getDetails = async(req,res)=>{
    const{id}=req.params;
        const phone = await phoneModel.findById(id);
    if(!phone){
        return res.status(400).json({message:"phone not found"});
    }
    return res.status(200).json({message:"success",phone});

}