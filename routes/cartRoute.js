const express = require('express');
const cartRouter = express.Router();
const cartController = require('./../controller/cartController.js');

cartRouter.post('/cart', cartController.getCartProducts);
cartRouter.post('/cart/addproduct', cartController.addProductToCart);
cartRouter.post('/cart/removeProduct', cartController.removeCartProduct);
cartRouter.post('/cart/increaseProduct', cartController.increaseByOne);
cartRouter.post('/cart/decreaseProduct', cartController.decreaseByOne);
cartRouter.post('/cart/emptyCart', cartController.getCartEmpty);

module.exports = cartRouter;
