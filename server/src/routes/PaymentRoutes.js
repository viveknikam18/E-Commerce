import express from "express"
import { fetchAllPayment, paymentCreate, paymentUpdate } from "../controller/PaymentController.js"

let router = express.Router()


router.post("/createpayment",paymentCreate)
router.put("/paymentupdate",paymentUpdate)
router.get("/fetchallpayment",fetchAllPayment)


export const paymentRoutes = router