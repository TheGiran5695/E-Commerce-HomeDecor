const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body; // No need for user_Name or user_PhoneNumber in request body.

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid input. Cart items are missing." });
    }

    // Calculate total amount from cartItems
    const amount = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty, 
      0
    ).toFixed(2);

    const status = "pending"; // Initial order status
    const order = await orderModel.create({ cartItems, amount, status }); // Create order without user details

    // Loop to update product stock
    for (const item of cartItems) {
      const product = await productModel.findById(item.product._id);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found.` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}. Requested: ${item.qty}, Available: ${product.stock}.`,
        });
      }
      product.stock -= item.qty;
      await product.save(); // Update the stock in the database
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order // Return the order details
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: "An error occurred.", error: error.message });
  }
};
