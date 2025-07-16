import express from "express";
import dotenv from "dotenv"
import { ConnectToDb } from "./db/dbConfig.js";
import userRouter from './routes/user.routes.js'
import reviewRouter from './routes/review.route.js'
import orderRouter from './routes/order.route.js'
import conversationRouter from './routes/conversation.route.js'
import gigRouter from './routes/gig.route.js'
import messageRouter from './routes/message.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/jwt.js";


const app=express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:process.env.FRONTENDURL,credentials:true}));
app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/gigs',gigRouter);
app.use('/api/orders',orderRouter);
app.use('/api/conversations',conversationRouter);
app.use('/api/messages',messageRouter);
app.use('/api/reviews',reviewRouter)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});



app.listen(process.env.PORT,()=>{

    ConnectToDb();
    console.log(`Server is running on port ${process.env.PORT}`)
})