import express from "express";
import { getAllUser, login, profile, register } from "../controller/UserController.js";

const userRouter = express.Router();

userRouter.get('/get', getAllUser)
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', profile);

export default userRouter