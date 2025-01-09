const mongoose = require('mongoose');

// All Products Schema
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    MRP: { type: Number, required: true },
    offers: { type: Number, required: true },
    stock: Number,
    modelnumber: { type: String },
    dimensions: { type: String },
    EXmaterial: { type: String, required: true },
    INmaterial: { type: String, required: true },
    color: { type: String },
    images: [
        {
            image: String
        }
    ],
    ratings: Number,
    capacity: { type: String },
    category: { type: String },
    seller: { type: String },
      // Automatically set to current date
});

// Create and export the Product model
const productModel = mongoose.model('Product', ProductSchema);

module.exports = productModel;
