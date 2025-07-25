import mongoose from "mongoose";

const {Schema} =mongoose;

const ConversationSchema=new Schema({
    id:{
        type:String,
        required:true,
    },
    sellerId:{
        type:String,
        required:true,
    },
    buyerId:{
        type:String,
        required:true,
    },
    readBySeller:{
        type:Boolean,
        required:true,
    },
    readByBuyer:{
        type:Boolean,
        required:true,
    },
    lastMessage:{
        type:String,
        required:false,
    },
    id:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
})

export default mongoose.model("Conversation",ConversationSchema);
