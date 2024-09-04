import express from 'express'
import { addToCart, clearCart, removeProductFromItem, userCart } from '../controller/CartController.js';
const router = express.Router();

router.post('/add', addToCart)

// get user cart 
router.get('/user', userCart)

//remove product from cart 
router.delete("/remove/:productId", removeProductFromItem)

//clear product from cart 
router.delete("/clear", clearCart)

export default router;