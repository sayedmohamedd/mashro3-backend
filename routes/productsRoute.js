const express = require('express');
const productsRouter = express.Router();
const productsController = require('./../controller/productsController.js');

productsRouter.get('/products', productsController.getProducts);
productsRouter.get(
  '/products/:pageNumber/:category',
  productsController.getProductsByPageNumber
);

module.exports = productsRouter;
