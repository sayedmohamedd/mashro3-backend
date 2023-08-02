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
  let { sort } = req.params;
  let products;
  pageNumber = parseInt(pageNumber);
  if (pageNumber === 1) {
    if (category === 'default') {
      if (sort === 'default') {
        products = await ProductModel.find().limit(12);
      } else {
        if (sort === 'lowestPrice') {
          products = await ProductModel.find().sort({ price: 1 }).limit(12);
        } else if (sort === 'heightPrice') {
          products = await ProductModel.find().sort({ price: -1 }).limit(12);
        }
      }
    } else if (category !== '') {
      if (sort === 'default') {
        products = await ProductModel.find({
          category,
        }).limit(12);
      } else {
        if (sort === 'lowestPrice') {
          products = await ProductModel.find({
            category,
          })
            .sort({ price: 1 })
            .limit(12);
        } else if (sort === 'heightPrice') {
          products = await ProductModel.find({
            category,
          })
            .sort({ price: -1 })
            .limit(12);
        }
      }
    }
  } else if (pageNumber > 1) {
    if (category === 'default') {
      if (sort === 'default') {
        products = await ProductModel.find()
          .skip((pageNumber - 1) * 12)
          .limit(12);
      } else {
        if (sort === 'lowestPrice') {
          products = await ProductModel.find()
            .sort({ price: 1 })
            .skip((pageNumber - 1) * 12)
            .limit(12);
        } else if (sort === 'heightPrice') {
          products = await ProductModel.find()
            .sort({ price: -1 })
            .skip((pageNumber - 1) * 12)
            .limit(12);
        }
      }
    } else if (category !== '') {
      if (sort === 'default') {
        products = await ProductModel.find({ category })
          .skip((pageNumber - 1) * 12)
          .limit(12);
      } else {
        if (sort === 'lowestPrice') {
          products = await ProductModel.find({ category })
            .sort({ price: -1 })
            .skip((pageNumber - 1) * 12)
            .limit(12);
        } else if (sort === 'heightPrice') {
          products = await ProductModel.find({ category })
            .sort({ price: -1 })
            .skip((pageNumber - 1) * 12)
            .limit(12);
        }
      }
    }
  }
  return res.json(products);
};
