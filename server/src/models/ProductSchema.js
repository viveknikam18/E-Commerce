import mongoose from "mongoose";

let ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productStock: {
        type: Number,
        required: true,
        default: 0
    },
    productCategory: {
        type: String,
        required: true
    },
     prodBrand: {
            type: String,
            required: true
        },
     prodImage: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", ProductSchema);