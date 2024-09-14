import express from 'express';
import { addToCart, clearCart, decreaseProductQty, removeProductFromItem, userCart } from '../controller/CartController.js';
import { Authenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

// /api/cart
router.post('/add', Authenticated, addToCart); 
router.get('/user', Authenticated, userCart);
router.delete('/remove/:productId', Authenticated, removeProductFromItem);
router.delete('/clear', Authenticated, clearCart);
router.post('/decrease-qty', Authenticated, decreaseProductQty);

export default router;
