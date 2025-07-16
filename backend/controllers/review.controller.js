import Review from '../model/review.model.js';
import createError from '../utils/createError.js';
import Gig from "../model/gig.model.js"

export const createReview=async(req,res,next)=>{

if(req.isSeller) return next(createError(404,"Seller can't create reviews"))
    console.log(req.body);
    const newReview=new Review({
        userId:req.userId,
        gigId:req.body.gigId,
        desc:req.body.desc,
        star:req.body.star
    })

    try{
        const review=await Review.findOne({userId:req.userId,gigId:req.body.gigId});

        if(review) return next(createError(404,"You have already create a review for this gig!"));

        const savedReview= await newReview.save();

        await Gig.findByIdAndUpdate(req.body.gigId,{
            $inc:{toalStars:req.body.star,starNumber:1}
        })
         res.status(201).send(savedReview);

    }catch(error){
        next(error)
        console.log(error)
    }
}
export const getReviews=async(req,res,next)=>{
     try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview=async(req,res,next)=>{
    try{

    }catch(error){
        next(error)
        console.log(error)
    }
}

