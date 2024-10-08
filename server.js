import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/ProductRouter.js";
import cors from 'cors'
import userRouter from "./routes/UserRouter.js";
import cartRouter from './routes/CartRouter.js'
import addresRouter from "./routes/AddressRouter.js";
// import paymentRouter from "./routes/PaymentRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(express.json());


app.use(cors({
  origin:true,
  methods: ["GET", "POST", "UPDATE", "DELETE"],
  credentials:true
}))


app.use('/api/products', router);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addresRouter);
// app.use('/api/payment', paymentRouter);

mongoose
  .connect(
    "mongodb+srv://harshservi48:U0mS5fTM2qPtfr2r@cluster0.tidct.mongodb.net/",
    { dbName: "SecondShoes" }
  )
  .then(() => console.log("MongoDb connected Successfully..."))
  .catch(() => console.log("Internal server error from DB Connect"));
 
const port = 1000; 
app.listen(port, () => { 
  console.log(`Server is Running on port ${port}`);
});
