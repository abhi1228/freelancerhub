import createError from "../utils/createError.js";
import gigModel from "../model/gig.model.js";

export const createGig = async (req, res, next) => {
    console.log(req.isSeller)
  if (!req.isSeller) {
    return next(createError(403, "UnAuthorized to create gig"));
  }
  try {
    const newGig = new gigModel({ ...req.body, userId: req.userId });

    const savedGig = await newGig.save();
    return res.status(201).send(savedGig);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig=await gigModel.findById(req.params.id);
    if(!gig) return next(createError(404,"gig not found"));
    return res.status(200).send(gig);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;
  console.log(q.userId);
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await gigModel.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
    console.log(err)
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const isGig = await gigModel.findById(req.params.id);
    console.log(isGig)
    if (isGig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));
    
    const deleteGig = await gigModel.findByIdAndDelete(req.params.id);
    return res.status(200, "gig has been deleted ");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
