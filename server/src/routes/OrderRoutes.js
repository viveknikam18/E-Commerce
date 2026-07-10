import express from "express"
import { deleteOrder, fetchOrderbyId,fetchOrderbyuserId,fetchallOrders , orderCreate, updateOrder } from "../controller/OrderController.js"

let router = express.Router()


router.post("/ordercreate",orderCreate)
router.get("/fetchallorders",fetchallOrders)
router.get("/fetchordersbyid/:id",fetchOrderbyId)
router.put("/updateorder",updateOrder)
router.delete("/deleteorder/:id",deleteOrder)

router.get("/fetchordersbyuserid/:userId",fetchOrderbyuserId)


export const orderRoutes = router