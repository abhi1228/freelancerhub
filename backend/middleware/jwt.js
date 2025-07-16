import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';


export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.accessToken;
    if(!token) return next(createError(401,"You are not authorized."));
    try{
        if(token){
        jwt.verify(token,process.env.SECRET,(err,payload)=>{
                if(err) return next(createError(403,"Token is Invalid ,Login again")) ;
                //console.log(payload)
                 req.userId=payload.id;
                 req.isSeller=payload.isSeller;   
        })
    }
    next();
    }catch(error){
        console.log(error);
    }
    
}