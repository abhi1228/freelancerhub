import { hashPassword, verifyPassword } from "../middleware/hashPassword.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req, res) => {
  try {
    const hashPass = await hashPassword(req.body.password);
    const newUser = new userModel({ ...req.body, password: hashPass });
    //console.log(req.body);
    await newUser.save();
    res.status(201).send("User created Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("SOmething went wrong in register");
  }
};

export const login = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) return next(createError(404, "User not found!")); //res.status(404).send("user not found");

    const correctUser = await verifyPassword(req.body.password, user.password);
    console.log(correctUser);
    if (!correctUser)
      return next(createError(404, "email or password is wrong"));
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.SECRET
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout=(req,res)=>{

  res.clearCookie("accessToken",{
    sameSite:"none",
    secure:true
  })
  .status(200).send("User has been logut")

}
