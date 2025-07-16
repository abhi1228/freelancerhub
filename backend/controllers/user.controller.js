import User from "../model/user.model.js";
import createError from "../utils/createError.js";

export const getUser = async (req, res, next) => {
  console.log('id:',req.params.id)
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};
