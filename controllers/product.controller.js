// Models
const Product = require('./../models/product.model');
// Utils
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/APIFeatures');

// Get All Products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const docs = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await docs.query;
  res.json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

// Get One Product By Slug
exports.getProduct = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug });
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

// Get Products By Name Or Slug
exports.getProductsByNameOrSlug = catchAsync(async (req, res, next) => {
  const { searchValue } = req.params;
  const products = await Product.find({
    $or: [
      { name: { $regex: searchValue, $options: 'i' } },
      { slug: { $regex: searchValue, $options: 'i' } },
    ],
  });
  res.json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

// LATEST PRODUCTS
// exports.getLatestProducts = async (req, res) => {
//   const products = await Product.find().sort({ created_at: -1 });
//   return res.json(products);
// };

// Add Product by Admin
exports.addProduct = catchAsync(async (req, res, next) => {
  // Check If Imaged Uploaded Successfully
  if (!req.file) {
    return next(new AppError('failed to upload the image', 400));
  }

  const { name, price, stock, description, category } = req.body;
  // Create Product
  const product = await Product.create({
    name,
    price,
    stock,
    description,
    category,
    image: req.file.path,
  });
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

// Update Porduct
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

// Delete Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// store products by filteringconst
// exports.getProductsByPageNumber = async (req, res) => {
//   let { pageNumber } = req.params;
//   let { category } = req.params;
//   let { sort } = req.params;
//   let products;
//   pageNumber = parseInt(pageNumber);
//   if (pageNumber === 1) {
//     if (category === 'default') {
//       if (sort === 'default') {
//         products = await Product.find().limit(12);
//       } else {
//         if (sort === 'lowestPrice') {
//           products = await Product.find().sort({ price: 1 }).limit(12);
//         } else if (sort === 'heightPrice') {
//           products = await Product.find().sort({ price: -1 }).limit(12);
//         }
//       }
//     } else if (category !== '') {
//       if (sort === 'default') {
//         products = await Product.find({
//           category,
//         }).limit(12);
//       } else {
//         if (sort === 'lowestPrice') {
//           products = await Product.find({
//             category,
//           })
//             .sort({ price: 1 })
//             .limit(12);
//         } else if (sort === 'heightPrice') {
//           products = await Product.find({
//             category,
//           })
//             .sort({ price: -1 })
//             .limit(12);
//         }
//       }
//     }
//   } else if (pageNumber > 1) {
//     if (category === 'default') {
//       if (sort === 'default') {
//         products = await Product.find()
//           .skip((pageNumber - 1) * 12)
//           .limit(12);
//       } else {
//         if (sort === 'lowestPrice') {
//           products = await Product.find()
//             .sort({ price: 1 })
//             .skip((pageNumber - 1) * 12)
//             .limit(12);
//         } else if (sort === 'heightPrice') {
//           products = await Product.find()
//             .sort({ price: -1 })
//             .skip((pageNumber - 1) * 12)
//             .limit(12);
//         }
//       }
//     } else if (category !== '') {
//       if (sort === 'default') {
//         products = await Product.find({ category })
//           .skip((pageNumber - 1) * 12)
//           .limit(12);
//       } else {
//         if (sort === 'lowestPrice') {
//           products = await Product.find({ category })
//             .sort({ price: -1 })
//             .skip((pageNumber - 1) * 12)
//             .limit(12);
//         } else if (sort === 'heightPrice') {
//           products = await Product.find({ category })
//             .sort({ price: -1 })
//             .skip((pageNumber - 1) * 12)
//             .limit(12);
//         }
//       }
//     }
//   }
//   return res.json(products);
// };

// search
// exports.productsSearch = async (req, res) => {
//   const { searchValue } = req.body;
//   const products = await Product.find({
//     name: { $regex: searchValue, $options: 'i' },
//   });
//   return res.json(products);
// };
