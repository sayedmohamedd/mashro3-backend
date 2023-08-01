const CartModel = require('./../models/Cart');
const ProductModel = require('./../models/Products');

exports.addProductToCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    // if already exists
    const existsProduct = await CartModel.findOne({
      product_id,
      user_id,
    });
    if (existsProduct) {
      await CartModel.updateOne(
        { product_id, user_id },
        { $inc: { number: 1 } }
      );
      return res.json({
        msg: 'product increased by one',
        success: true,
        status: 201,
      });
    }
    // if new product
    const product = req.body;
    const newProduct = await new CartModel(product);
    await newProduct.save();
    return res.json({
      msg: 'product added to cart',
      success: true,
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};

// get cart products
exports.getCartProducts = async (req, res) => {
  const { user_id } = req.body;
  const cartProducts = await CartModel.find({ user_id });
  return res.json(cartProducts);
};

// get cart count
exports.getCardCount = async (req, res) => {
  const { user_id } = req.body;
  const count = await CartModel.countDocuments({ user_id });
  return res.json(count);
};

// remove product
exports.removeCartProduct = async (req, res) => {
  const { user_id, product_id } = req.body;
  const deleteCommand = await CartModel.deleteOne({
    user_id,
    product_id,
  });
  return res.json(deleteCommand);
};

// increase By One
exports.increaseByOne = async (req, res) => {
  const { user_id, product_id } = req.body;
  await CartModel.updateOne({ product_id, user_id }, { $inc: { number: 1 } });
  return res.json({
    msg: 'product increased by one',
    success: true,
    status: 200,
  });
};

//decrease By One
exports.decreaseByOne = async (req, res) => {
  const { user_id, product_id } = req.body;
  await CartModel.updateOne({ product_id, user_id }, { $inc: { number: -1 } });
  return res.json({
    msg: 'product decreased by one',
    success: true,
    status: 200,
  });
};

// Empty Cart
exports.getCartEmpty = async (req, res) => {
  const { user_id } = req.body;
  await CartModel.deleteMany({ user_id });
  return res.json({
    msg: 'cart is clear',
    success: true,
    status: 200,
  });
};
