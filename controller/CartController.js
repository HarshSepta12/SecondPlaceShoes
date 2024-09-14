import { Cart } from "../models/CartModel.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, title, description, price, qty, imgSrc } = req.body;

  const userId = req.user;


  let cart = await Cart.findOne({ userId });


  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // console.log(cart.items);


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
  const userId =  req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) return res.json({ message: "Cart Not Found...", success: false });

  res.json({ message: `User Cart `, cart, success: false });
};


export const removeProductFromItem = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ message: "Cart not found...", success: false });
    }


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

  const userId = req.user;
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

export const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({ message: "Cart not found...", success: false });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;
      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json({ message: "Item quantity decreased", cart });
  } else {
    res.json({ message: "Invalid product ID", success: false });
  }
};
