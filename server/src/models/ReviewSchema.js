import mongoose from "mongoose"

let ReviewSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    reviweDate:{type:Date, default:Date.now},
    prodId:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
    rating:{type:Number, required:true},
    comment:{type:String, required:true}
})

export const Review = mongoose.model("Review", ReviewSchema);