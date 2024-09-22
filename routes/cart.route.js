const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllCartProducts,
  addProductToCart,
  removeProductFromCart,
  decreaseProductNumberByOne,
  resetCart,
  increaseProductNumberByOne,
} = require('../controllers/cart.controller.js');
const { protect, restrictTo } = require('../controllers/auth.controller.js');

// Protect All Routes
router.use(protect);

router
  .route('/')
  .get(getAllCartProducts)
  .post(addProductToCart)
  .delete(resetCart);

// Increase & Decrease Existed Cart Products
router.route('/increase').patch(increaseProductNumberByOne);
router.route('/decrease').patch(decreaseProductNumberByOne);

// removeProductFromCart
router.route('/:id').delete(removeProductFromCart);

module.exports = router;
