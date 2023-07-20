const ProductModel = require('./../models/Products');

exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  return res.json(products);
};

exports.getProductsByPageNumber = async (req, res) => {
  let { pageNumber } = req.params;
  let { category } = req.params;
  pageNumber = parseInt(pageNumber);
  let products;
  if (pageNumber === 1) {
    // const categoryCheck = category === 'default' ? 1 : `${category}`;
    // products = await ProductModel.find({ categoryCheck }).limit(12);
    if (category === 'default') {
      products = await ProductModel.find().limit(12);
    } else if (category !== '') {
      products = await ProductModel.find({
        category,
      }).limit(12);
    }
  } else if (pageNumber > 1) {
    if (category === 'default') {
      products = await ProductModel.find()
        .skip((pageNumber - 1) * 12)
        .limit(12);
    } else if (category !== '') {
      products = await ProductModel.find({ category })
        .skip((pageNumber - 1) * 12)
        .limit(12);
    }
  }
  return res.json(products);
};
