import mongoose from "mongoose";

let PaymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMode: {
        type: String,
        enum: ["COD", "UPI", "Debit / Credit Card", "NetBanking", "Wallet"],
        default: "COD"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "success", "failed", "refunded"],
        default: "pending"
    },

    paymentDate: {
        type: Date,
        default: Date.now
    }
});

export const Payment = mongoose.model("Payment", PaymentSchema);