const ProductModel = require('./../models/Products');

// ALL PRODUCTS
exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  return res.json(products);
};

// LATEST PRODUCTS
exports.getLatestProducts = async (req, res) => {
  const products = await ProductModel.find().sort({ created_at: -1 });
  return res.json(products);
};

// get product by slug
exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const product = await ProductModel.findOne({ slug });
  res.json(product);
};

// search
exports.productsSearch = async (req, res) => {
  const { searchValue } = req.body;
  const products = await ProductModel.find({
    name: { $regex: searchValue, $options: 'i' },
  });
  return res.json(products);
};

// store products by filtering
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
