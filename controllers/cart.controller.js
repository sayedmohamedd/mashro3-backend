const Cart = require('../models/cart.model');
const catchAsync = require('./../utils/catchAsync');

// get cart products
exports.getAllCartProducts = catchAsync(async (req, res, next) => {
  const cartProducts = await Cart.find({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    results: cartProducts.length,
    data: {
      cart: cartProducts,
    },
  });
});

// Add Product To Cart or Increase Already Exist Product By One
exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { product_id } = req.body;

  // if already exists
  const existedProduct = await Cart.findOne({
    user: req.user._id,
    product: product_id,
  });

  if (existedProduct) {
    const updatedProduct = await Cart.updateOne(
      { user: req.user._id, product: product_id },
      { $inc: { number: 1 } }
    );
    return res.status(200).json({
      success: 'success',
      data: {
        product: updatedProduct,
      },
    });
  }

  // if new product
  const newProduct = await Cart.create({
    product: product_id,
    user: req.user._id,
    number: 1,
  });
  return res.status(201).json({
    success: 'success',
    data: {
      product: newProduct,
    },
  });
});

// Remove One Product From Cart
exports.removeProductFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Cart.deleteOne({
    _id: id,
  });
  return res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Decrease Product Already In Cart By One
exports.decreaseProductNumberByOne = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const updatedProduct = await Cart.updateOne(
    { _id: id },
    { $inc: { number: -1 } }
  );
  res.status(204).json({
    success: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

// Reset Cart Empty
exports.resetCart = catchAsync(async (req, res, next) => {
  await Cart.deleteMany({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
