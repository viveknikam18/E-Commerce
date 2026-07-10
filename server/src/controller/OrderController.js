
import { Order } from "../models/OrderSchema.js"
import {Payment} from "../models/PaymentSchema.js"

// let orderCreate = async (req, res) => {
//     let body = req.body;
//     console.log(body);

//     try {
//         // Create Order
//         let result = await Order.create(body);

//         // Create Payment
//         let payResult = await Payment.create({
//             orderId: result._id,
//             userId: body.userId, // or req.user._id depending on your auth
//             paymentMode: "COD"
//         });

//         // Send response
//         res.status(200).json({
//             message: "Order Created Successfully",
//             data: {
//                 order: result,
//                 payment: payResult
//             },
//             success: true
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             data: null,
//             success: false
//         });
//     }
// };


let orderCreate = async (req, res) => {
    let body = req.body
    console.log(body)

    try {
        let result = await Order.create(body)

        // let payResult = await Payment.create({ orderId: body._id, userId: body.userId, paymentMode: "COD" });
        
         let payResult = await Payment.create({
            orderId: result._id,   // ✅ use result._id
            userId: result.userId,
            amount: result.orderAmount,
            paymentMode: result.paymentType || "COD"
        });

        res.status(200).json({
            message: "Order Create Successfully",
            data: result,
            payment: payResult,
            success: true
            
             
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })

    }
}

let fetchallOrders = async (req, res) => {
    try {
        let result = await Order.find().populate("userId").populate("ordersItems.prodId")
        res.status(200).json({
            message: "Order Fetched Successfully",
            data: result,
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })

    }
}
let fetchOrderbyId = async (req, res) => {
    let { id } = req.params
    console.log(id)

    try {
        let result = await Order.findOne({ _id: id, orderStatus : {$ne : "cancelled"} })
        .populate("userId", "firstName, lastName, address, email").populate("ordersItems.prodId")

        //  let payResult = await Payment.create({orderId: result._id , userId: result._id,  paymentMode: "COD", })

        res.status(200).json({
            message: "Order Found",
            data: result,
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })

    }
}
let updateOrder = async (req, res) => {
    let { _id, orderStatus } = req.body
    try {
        let result = await Order.updateOne({ _id }, { orderStatus })
        res.status(200).json({
            message: "Order status Updated",
            data: result,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })

    }
}

let deleteOrder = async (req, res) => {
    let { id } = req.params
    try {
        let result = await Order.deleteOne({ _id: id })
        res.status(200).json({
            message: "Deleted Order",
            data: result,
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })

    }
}

let fetchOrderbyuserId = async (req, res) => {
    let { userId } = req.params
    console.log(userId)

    try {
        let result = await Order.find({ userId: userId,  })
        .populate("userId")
        .populate("ordersItems.prodId")
        // .where("orderStatus").neq("Cancel")

        res.status(200).json({
            message: "Order Found",
            data: result,
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
            success: false
        })

    }
}

export {
    orderCreate,
    fetchallOrders,
    fetchOrderbyId,
    updateOrder,
    deleteOrder,
    fetchOrderbyuserId
}