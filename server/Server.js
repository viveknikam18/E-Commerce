import express from "express"
import connectToDb from "./src/config/dbconfig.js"
import { userRoutes } from "./src/routes/UserRoutes.js"
import { orderRoutes } from "./src/routes/OrderRoutes.js"
import { productRoutes } from "./src/routes/ProductRoutes.js"
import { reviewRoutes } from "./src/routes/ReviewRoutes.js"
import { authRoutes } from "./src/routes/AuthRoutes.js"

import cors from "cors"

import bodyParser from "body-parser"
import { paymentRoutes } from "./src/routes/PaymentRoutes.js"


const Server = express()

Server.use(bodyParser.json())

Server.get("/",(req, res)=>{
    res.send("Hello form Server")
})

connectToDb()


Server.use(cors())
Server.use(cors())
Server.use("/api",userRoutes)
Server.use("/api",orderRoutes)
Server.use("/api",productRoutes)
Server.use("/api",reviewRoutes)
Server.use("/api/auth",authRoutes)
Server.use("/api",paymentRoutes)


Server.use("/uploads", express.static("prodimgupload"));


Server.listen(5000, ()=>{
    console.log("Server Started...");
    
})