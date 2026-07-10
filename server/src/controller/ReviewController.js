import { Review } from "../models/ReviewSchema.js";

let createReview = async(req, res)=>{
    let body = req.body
    console.log(body)

    try {
        let result = await Review.create(body)
        res.status(200).json({
            message:"Create Review Successfully",
            data:result,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            data:null,
            success:false
        }) 
    }
}

let updateReview = async (req, res)=>{
    let {_id, userId, prodId, rating, comment} = req.body
    try {
        let result = await Review.updateMany({_id},{userId, prodId, rating, comment})
        res.status(200).json({
            message:"Review Updated...",
            data:result,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            data:null,
            success:false
        })
    }
}

let deleteReview = async (req, res)=>{
    let {id} = req.params
    try {
        let result = await Review.deleteOne({_id: id})
        res.status(200).json({
            message:"Review Deleted...",
            data:result,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            data:null,
            success:false
        })
    }
}

export{
    createReview,
    updateReview,
    deleteReview
}