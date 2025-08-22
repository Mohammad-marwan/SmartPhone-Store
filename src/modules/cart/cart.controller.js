import cartModel from '../../../DB/models/cart.model.js';

export const create = async(req,res)=>{

    const {versionId} = req.body;
    const cart = await cartModel.findOne({userId:req.id});
    if(!cart){
        const newCart = await cartModel.create({
            userId:req.id,
            version:{versionId}
        });
        return res.status(200).json({message:"success",cart:newCart})
    }

    for(let i =0;i<cart.version.length;i++){
        if(cart.version[i].versionId == versionId){
                   return res.status(201).json({message:"phone alrdy add"});

        }
    }

     cart.version.push({versionId});
       await cart.save();
        
       return res.status(201).json({message:"success",cart});

}