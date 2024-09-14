import mongoose from 'mongoose';

const cartItemsSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  imgSrc: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  items: [cartItemsSchema],
});

export const Cart = mongoose.model('Cart', cartSchema);
