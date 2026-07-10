import mongoose from "mongoose"

let OrderSchema = new mongoose.Schema({
    orderAmount:{type:Number, required:true},
    orderDate:{type:Date, default:Date.now},
    orderStatus:{
        type:String,
        enum: ["pending", "Approve", "Intransit", "Delivered", "Cancel"],
        default:"pending"
    },
    paymentType:{type:String, default:"COD"},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},

    ordersItems:[
        {
            prodId:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
            Qty:{type:Number}

        }
    ]

})
export const Order = mongoose.model("Order", OrderSchema);