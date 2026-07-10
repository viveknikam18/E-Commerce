
import {User} from "../models/UserSchema.js"

let createUser = async (req, res)=>{
    let body = req.body
    console.log(body)

    try {
        let result = await User.create(body)
        res.status(200).json({
            message:"User Create Successfully.",
            data: result,
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
let fetchAllUser = async (req, res)=>{
    try {
        let result = await User.find()
        res.status(200).json({
            message:"User Fetched Successfully",
            data: result,
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })
        
    }
}

let fetchByUserId = async (req, res)=>{
    let {id} = req.params
    console.log(id)

    try {
        let result = await User.findOne({_id:id})
        res.status(200).json({
            message:"User Found...",
            data: result,
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

let updateUser = async (req, res)=>{
    let {_id, userMobile, userEmail} = req.body
    try {
        let result = await User.updateMany({_id}, {mobileNumber, email})
        res.status(200).json({
            message:"User Updated",
            data:result,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:null,
            success:false
        })
        
    }
}

let deleteUser = async (req, res)=>{
    let {id} = req.params
    try {
        let result = await User.deleteOne({_id: id})
        res.status(200).json({
            message:"Deleted User",
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

export {
    createUser,
    fetchAllUser, 
    fetchByUserId, 
    updateUser, 
    deleteUser
}