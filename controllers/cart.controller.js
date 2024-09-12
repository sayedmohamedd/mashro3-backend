const Cart = require('../models/cart.model');

// get cart products
exports.getAllCartProducts = async (req, res) => {
  try {
    const cartProducts = await Cart.find({ user: req.user._id });
    res.status(200).json({
      status: 'success',
      results: cartProducts.length,
      data: {
        cart: cartProducts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Add Product To Cart or Increase Already Exist Product By One
exports.addProductToCart = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Remove One Product From Cart
exports.removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.deleteOne({
      _id: id,
    });
    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Decrease Product Already In Cart By One
exports.decreaseProductNumberByOne = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(204).json({
      success: 'success',
      message: err.message,
    });
  }
};

// Reset Cart Empty
exports.resetCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(204).json({
      success: 'success',
      message: err.message,
    });
  }
};
