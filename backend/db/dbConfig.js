import mongoose from "mongoose";

export const ConnectToDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log('Database connected successfully')
    } catch (error) {
        console.log(error);
    }
}