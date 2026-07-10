import express from "express"
import { createProduct, deleteProduct, fetchAllProducts, fetchProductWithAvarageReview, updateProduct, updateProductPrice} from "../controller/ProductController.js"
import upload from "../middleware/ProductImage.js"


let router = express.Router()


router.post("/createproduct", upload.single("prodImage"),createProduct)
router.put("/updateproduct",updateProduct)
router.put("/updateproductprice",updateProductPrice)
router.delete("/deleteproduct/:id",deleteProduct)
router.get("/fetchproduct",fetchAllProducts)
router.get("/fetchProductWithAvarageReview",fetchProductWithAvarageReview)

export const productRoutes = router