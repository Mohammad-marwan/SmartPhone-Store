import orderModel from "../../../DB/models/order.model.js";
import reviewModel from '../../../DB/models/review.model.js';

export const create = async (req,res)=>{
    const userId = req.id;
    const {versionId} = req.params;
    const {comment,rating} = req.body

    const order = orderModel.findOne({
        userId:userId,
    });

    if(!order){
            return res.status(200).json({message:"cant review this phone"});

    }
    const review = await reviewModel.create({
        comment,
        rating,
        versionId,
        createdBy:userId

    })
    return res.status(200).json({message:"success"});


}