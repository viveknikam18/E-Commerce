import express from "express"
import { createReview, deleteReview, updateReview } from "../controller/ReviewController.js";

let routes = express.Router();
 
routes.post("/createreview", createReview)
routes.put("/updatereview", updateReview)
routes.delete("/deletereview/:id", deleteReview)

export const reviewRoutes = routes