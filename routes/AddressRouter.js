import express from "express"
import { addAddress, getAddress } from "../controller/AddressController.js";
import { Authenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

//add address
router.post('/add',Authenticated, addAddress);
//get address
router.get('/get', Authenticated, getAddress);


export default router;