import {Payment} from "../models/PaymentSchema.js"

let paymentCreate = async (req, res) => {
    let body = req.body
    console.log(body)

    try {
        let result = await Payment.create(body)
        res.status(200).json({
            message: "Payment Create Successfully",
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

let paymentUpdate = async (req, res)=>{
    let { orderId, paymentMode, paymentStatus } = req.body
        try {
            let result = await Payment.updateMany({ orderId: orderId }, { paymentMode, paymentStatus })
            res.status(200).json({
                message: "Pyment status Updated",
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

     let fetchAllPayment = async (req, res) => {
            
     try {
            let result = await Payment.find()
            res.status(200).json({
            message: "Payment fetched successfully.",
            data: result,
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

export{
    paymentCreate,
    paymentUpdate,
    fetchAllPayment   
}