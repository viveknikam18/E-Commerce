import express from "express"
import { createUser, deleteUser, fetchAllUser, fetchByUserId, updateUser } from "../controller/UserController.js"

let router = express.Router()

router.post("/createuser",createUser)
router.get("/fetchusers",fetchAllUser)
router.get("/fetchusers/:id",fetchByUserId)
router.put("/updateuser",updateUser)
router.delete("/deleteuser/:id",deleteUser)

export const userRoutes = router