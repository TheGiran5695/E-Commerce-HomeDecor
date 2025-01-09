const express = require('express');
const { getAllProducts, getAllSingleProducts } = require('../controllers/productController');
const router = express.Router();

// All Products Router
router.route('/AllProducts').get(getAllProducts);
router.route('/AllProducts/:id').get(getAllSingleProducts);





module.exports = router;