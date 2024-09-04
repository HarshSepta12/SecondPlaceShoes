import express from "express";
import { addProduct, getProduct, getProductByID, getProductByTitle, UpdateProduct } from "../controller/Product.js";
const router = express.Router();


// url - /api/products/
router.get('/get', getProduct);

// url - /api/products/add 
router.post('/add', addProduct)

//url - /api/products/:id
router.put("/:id", UpdateProduct)

//url - /api/products/:id
router.get("/:id", getProductByID)

//url- /api/products/product
router.get('/', getProductByTitle)

 
export default router