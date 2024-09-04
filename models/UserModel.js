import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name: {type: String, require:true},
     email: {type: String, require:true},
     phone: {type: Number, require:true},
     password: {type: String, require:true},
     createdAt: {type:Date, default: Date.now}})
export const User = mongoose.model("Users", userSchema);