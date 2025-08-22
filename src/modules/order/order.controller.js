import cartModel from '../../../DB/models/cart.model.js';
import versionModel from '../../../DB/models/version.model.js';
import userModel from '../../../DB/models/user.model.js';
import orderModel from '../../../DB/models/order.model.js';



export const create = async(req,res)=>{
    const cart = await cartModel.findOne({userId:req.id});
    if(!cart){
       return res.status(400).json({message:"cart not  found"})
    }

    const finalPhone = [];
    for(let version of cart.version){
        const checkPhone =  await versionModel.findOne({
            _id:version.versionId,
            stock:{$gte:version.quantity}
        });      
       if(!checkPhone){
            return res.status(400).json({message:"phone quantity not avalibale"})
        }
        version = version.toObject();
        version.versionName = checkPhone.name;
        version.unitPrice = checkPhone.price;
        version.finalPrice = version.quantity * checkPhone.price
        finalPhone.push(version)

    }

    const user = await userModel.findById(req.id);
    if(!req.body.address){
        req.body.address = user.address;
    }
     if(!req.body.phoneNumber){
        req.body.phoneNumber = user.phoneNumber;
    }
    const order = await orderModel.create({
        userId : req.id,
        version:finalPhone,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber 


    })
     return res.status(201).json({message:"success",order});

}

export const getOrder = async(req,res)=>{

const order = await orderModel.find({userId:req.id}).populate("version.versionId");
return res.status(200).json({message:"success",order})

}