import { Cart } from "../models/CartModel.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, title, description, price, qty, imgSrc } = req.body;

  const userId = "66d212178dd7f091b54e6ccd";

  // Find the user's cart
  let cart = await Cart.findOne({ userId });

  // If the cart doesn't exist, create a new one
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  console.log(cart.items);

  // Check if the item is already in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, description, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ message: "Items Added To Cart..", cart, success: true });
};

//get User Cart
export const userCart = async (req, res) => {
  const userId = "66d212178dd7f091b54e6ccd";

  let cart = await Cart.findOne({ userId });

  if (!cart) return res.json({ message: "Cart Not Found...", success: false });

  res.json({ message: `User Cart `, cart, success: false });
};

// remove product from cart
export const removeProductFromItem = async (req, res) => {
     try {
       const productId = req.params.productId;
       const userId = "66d212178dd7f091b54e6ccd";
       let cart = await Cart.findOne({ userId });
   
       if (!cart) {
         return res.json({ message: "Cart not found...", success: false });
       }

       // Remove the product from the cart
       cart.items = cart.items.filter(
         (item) => item.productId.toString() !== productId
       );
   
       await cart.save();
       res.json({ message: "Product removed...", cart, success: true });
     } catch (error) {
       res.status(500).json({ message: "Server error...", success: false, error: error.message });
     }
   };

// clear product from cart
export const clearCart = async (req, res) => {

  const userId = "66d212178dd7f091b54e6ccd";
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ items: [] });
  } else {
    cart.items = [];
  }

  await cart.save();
  res.json({ message: "Cart Cleared...", cart, success: true });
};




// Decrease quantity
// export const decreaseProductQty = async (req, res) => {
//      const { productId, qty} = req.body;
   
//      const userId = "66d212178dd7f091b54e6ccd";
   
//      // Find the user's cart
//      let cart = await Cart.findOne({ userId });
   
//      // If the cart doesn't exist, create a new one
//      if (!cart) {
//        cart = new Cart({ userId, items: [] });
//      }
   
//      const itemIndex = cart.items.findIndex(
//        (item) => item.productId.toString() === productId
//      );
   
//      if (itemIndex > -1) {
//        cart.items[itemIndex].qty += qty;
//        cart.items[itemIndex].price += price * qty;
//      } else {
//        cart.items.push({ productId, title, description, price, qty, imgSrc });
//      }
   
//      await cart.save();
//      res.json({ message: "Items Added To Cart..", cart, success: true });
//    };