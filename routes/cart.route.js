const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllCartProducts,
  addProductToCart,
  removeProductFromCart,
  decreaseProductNumberByOne,
  resetCart,
} = require('../controllers/cart.controller.js');
const { protect } = require('../controllers/auth.controller.js');

// Protect All Routes
router.use(protect);

router
  .route('/')
  .get(getAllCartProducts)
  .post(addProductToCart)
  .patch(decreaseProductNumberByOne)
  .delete(resetCart);

// removeProductFromCart
router.route('/:id').delete(removeProductFromCart);

module.exports = router;
