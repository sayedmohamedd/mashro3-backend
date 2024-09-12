const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllProducts,
  getLatestProducts,
  getProductsByNameOrSlug,
} = require('./../controllers/product.controller');

// Get All Products
router.route('/').get(getAllProducts);

// Get Product
router.get('/latestProducts', getLatestProducts);
router.get('/:searchValue', getProductsByNameOrSlug);

module.exports = router;
