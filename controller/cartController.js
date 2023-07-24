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
      await CartModel.updateOne({ product_id }, { $inc: { number: 1 } });
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

exports.getCartProducts = async (req, res) => {
  const { user_id } = req.body;
  const cartProducts = await CartModel.find({ user_id });
  return res.json(cartProducts);
  // let result = [];
  // try {
  //   const CartProducts = await CartModel.find({ user_id });
  //   CartProducts.map(async (product) => {
  //     const matchedProduct = await ProductModel.findOne({
  //       _id: product.product_id,
  //     });
  //     result.push(matchedProduct);
  //   });
  //   return res.json(result);
  // } catch (error) {
  //   console.log(error);
  // }
};
