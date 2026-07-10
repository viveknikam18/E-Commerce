// import js from "@eslint/js";
import {User} from "../models/UserSchema.js"

let register = async (req, res)=>{
    let {firstName, lastName, email, password, age, gender, address}= req.body
    try {
        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(400).json({
                message:"User already exists with this email.",
                data:null,
                success:false
            })
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            age,
            gender,
            address
        })
        res.status(201).json({
            message:"User Register Successfully.",
            data:newUser,
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

let login = async (req ,res)=>{
    const {email, password}= req.body
    try {
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(404).json({
                message:"User Not Found.",
                data:null,
                success:false
            })
        }

         if (user.password !== password) {
            return res.status(400).json({
                message: "Invalid password.",
                data: null,
                success: false
            });
        }

        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            message:"Login Successfully",
            data: user,
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
    register,
    login
}