import express from "express";
import { getAllUser, login, profile, register } from "../controller/UserController.js";
import {Authenticated} from '../middlewares/isAuthenticated.js'

const userRouter = express.Router();

userRouter.get('/get',getAllUser)
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile',Authenticated, profile);

export default userRouter