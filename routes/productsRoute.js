const express = require('express');
const productsRouter = express.Router();
const productsController = require('./../controller/productsController.js');

productsRouter.get('/products', productsController.getProducts);
productsRouter.get('/latestProducts', productsController.getLatestProducts);
productsRouter.get(
  '/products/:pageNumber/:category',
  productsController.getProductsByPageNumber
);
productsRouter.post('/products/search', productsController.productsSearch);
productsRouter.get('/products/:slug', productsController.getProductBySlug);

module.exports = productsRouter;
