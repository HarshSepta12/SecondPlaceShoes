import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

export const Authenticated = async (req, res, next) => {
  const token = req.header("auth");

  if (!token) return res.json({ message: "Login First", success: false });

  const decode = jwt.verify(token, "Harsh@12");
  console.log("This comming from isAuthenticated", decode)
  const id = decode.userId;
  // console.log(id)

  let user = await User.findById(id);
  if (!user) return res.json({ message: "User not exist" });

  req.user = user;
 

  next();
};
