import {Product} from "../models/ProductSchema.js"
import { Review } from "../models/ReviewSchema.js"

let createProduct = async (req, res)=>{
    
    try {
            const {productName, productDescription, productPrice, productStock, productCategory, prodBrand} = req.body

            const product = await Product.create({
                productName,
                productDescription,
                productPrice,
                productStock,
                productCategory,
                prodBrand,
                prodImage:req.file ? req.file.filename:""
            })

        
        res.status(200).json({
            message:"Product Create Successfully",
            data:product,
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

let updateProduct = async (req, res)=>{
    let {_id , productName, productDescription, productPrice, productStock, productCategory, prodBrand, prodImage} = req. body
    try {
        let result = await Product.updateMany({_id},{productName, productDescription, productPrice, productStock, productCategory, prodBrand, prodImage})
        res.status(200).json({
            message:"Product Updated Successfully",
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

let updateProductPrice = async (req, res)=>{
    let {_id , productPrice} = req. body
    try {
        let result = await Product.updateOne({_id},{productPrice})
        res.status(200).json({
            message:"Product Price Updated Successfully",
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

let deleteProduct = async (req, res)=>{
    let {id} = req.params
            try {
                let result = await Product.deleteOne({_id:id})
                res.status(200).json({
                    message:"Deleted Product",
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

        const fetchAllProducts = async (req, res) => {
            
            try {
            const products = await Product.find()
             res.status(200).json({
            message: "Products fetched successfully.",
            data: products,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        });
    }
};


        const fetchProductWithAvarageReview = async (req, res)=>{
            try {
                const products = await Product.aggregate([
                    {
                        $lookup:{
                            from: "reviews",
                            localField:"_id",
                            foreignField:"prodId",
                            as:"reviews"
                        }
                    },

                    {
                        $addFields:{
                            averageRating:{
                                $ifNull:[{$avg:"$reviews.rating"},0]
                            },
                            reviewCount:{
                                $size:"$reviews"
                            }
                        }
                    },

                    {
                        $sort:{
                        createdAt: 1
                    }
                }
                ])
                res.status(200).json({
                    message:"Products with average review fetched successfully.",
                    data:products,
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
    createProduct,
    updateProduct,
    updateProductPrice,
    deleteProduct,
    fetchAllProducts,
    fetchProductWithAvarageReview
}