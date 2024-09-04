import { Product } from "../models/Product.Model.js";


// Getting Product 
export const getProduct = async (req, res) => {
     try {
          let product = await Product.find();
          res.json({message: "you data is here...",product, success: true})
     } catch (error) {
          res.json({message: "Internal server error", success:false})
     }

}

// Adding Product 
export const addProduct = async(req, res)=> {
     const {title, description, price, qty, img} = req.body;

     try {
          const product = await Product.create({title, description,price, qty, img })
          res.json({message: "Product added successfully",product, success:true})
     } catch (error) {
          res.json({ message: "Internal Server Error", success: false });
     }
     
}

// Update product 
export const UpdateProduct = async(req, res) => {
     const id = req.params.id

     try {
          let product = await Product.findByIdAndUpdate(id, req.body, {new:true});
          if(!product){
               res.json({message:"Invalud Id", success: false})
          }
          res.json({message: "Your product has been successfully", product, success:true})
     } catch (error) {
          res.json({message: "Internal Server Error", success: false})
     }

} 

// getProductByID 
export const getProductByID = async(req, res) => {
     const id = req.params.id

     try {
          let product = await Product.find({ _id: id } )
          res.json({message: "Your Product is here...", product, success:true})
     } catch (error) {
          res.json({message:"Internal server error", success:false})
     }
}


//getProductByTitle 
export const getProductByTitle = async(req, res) => {
     const title = req.query.title;

     try {
          const product = await Product.findOne({title: title});
          if(!product){
               res.json({message:"Product Not Found!...", success:false});
          }
          res.json({message: "Your Product is Here...", product, success:true});
     } catch(error) {
          res.json({message:"Internal server error", success:false})
     }
   
}