import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     title:{type:String, require:true},
     description:{type:String, require:true},
     price: {type: Number, require:true},
     qty: {type:Number,require:true},
     img:{type:String, require:true},
     createAt:{type:Date, default:Date.now}
})
export const Product = mongoose.model("products", productSchema) 