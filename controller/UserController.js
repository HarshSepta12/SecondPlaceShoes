import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//get all User
export const getAllUser = async(req, res) => {
  try {
    let user = await User.find();
    if(!user){
      res.json({message: "No user Found!...", success: false});
    }
    res.json({message:"All User Is Here...",user, success: true})
  } catch (error) {
    res.json({message: "Internal Server Error...", success:false})
  }
 
}

//Register
export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.json({ message: "User Already Registered", success: false });
     }
      let hasPassword = await bcrypt.hash(password, 10);

      user = await User.create({ name, email, phone, password:hasPassword});

      res.json({ message: "Register Successfull...", user, success: true });

  } catch (error) {
     res.json({ message: "Internal server error", success: false });
  }
};

//login

export const login = async (req, res) => {
     const { email, password } = req.body;
   
     try {
       let user = await User.findOne({ email });
   
       if (!user) {
         return res.json({ message: "User not exist...", success: false });
       }
   
       const passwordMatched = await bcrypt.compare(password, user.password);
   
       if (!passwordMatched) {
         return res.json({ message: "Wrong Password...", success: false });
       }
   
       const token = jwt.sign({ userID: user._id }, "Harsh@12");
   
       res.json({ message: `Welcome ${user.name}`, token, success: true });
     } catch (error) {
       res.json({ message: "Internal server error", success: false });
     }
   };


   //Profile
   export const profile = async(req, res) => {
    let token = req.header("auth");
      
    if(!token) {
      res.json({message:"Login First", success:false});
    }
    var decode = jwt.verify(token,"Harsh@12" )
    const id = decode.userID

    const user = await User.findById(id)
    if(user){
      const {name, email, phone,createdAt} = user;
      res.json({message: `Welcome ${name}`, name, email, phone, createdAt, success: true})
    }
   }
