const express = require('express');
const cartRouter = express.Router();
const cartController = require('./../controller/cartController.js');

cartRouter.post('/cart/addproduct', cartController.addProductToCart);
cartRouter.post('/cart', cartController.getCartProducts);

module.exports = cartRouter;
