import mongoose from "mongoose";
const {Schema}=mongoose;


const GigSchema=new Schema({
 userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    totalStars:{
        type:Number,
    },
    starNumber:{
        type:Number,
    },
    cat:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    cover:{
        type:String,
        unique:false
    },
    images:{
        type:[String],
        
    },
    shortTitle:{
        type:String,
        required:true,
    },
    shortDesc:{
        type:String,
        required:true,
    },
    deliveryTime:{
        type:Number,
  
    },
    revisionNumber:{
        type:Number,

    },
    features:{
        type:[String],
        required:false,
    },
    sales:{
        type:Number,
        default:0,
    },
    
},{
    timestamps:true
})

export default mongoose.model("Gig", GigSchema);