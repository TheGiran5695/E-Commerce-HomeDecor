const productModel = require('../models/productModel')



exports.getAllProducts = async(req, res, next) => {

    const keyword = req.query.keyword || '';  // Assuming keyword is sent in the body
    const query = keyword ? { name: { $regex: keyword, $options: 'i' }} : {};

    try {
        const products = await productModel.find(query); // Find products that match the query
        res.json({
            success: true,
            message: 'Get All Products Working!',
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllSingleProducts = async(req, res, next) => {

    try {
        const product = await productModel.findById(req.params.id);
        res.json({
            success: true,
            message: 'Get AllProducts in single on Working!',
            product
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            product
        })
    }
}