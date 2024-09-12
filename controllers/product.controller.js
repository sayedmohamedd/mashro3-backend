const Product = require('./../models/product.model');
const APIFeatures = require('./../utils/APIFeatures');

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get One Product By Slug
exports.getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: 'success',
      message: err.message,
    });
  }
};

// Get Products By Name Or Slug
exports.getProductsByNameOrSlug = async (req, res) => {
  const { searchValue } = req.params;
  try {
    // const products = await Product.find({
    //   name: { $regex: searchValue, $options: 'i' },
    // });
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// LATEST PRODUCTS
exports.getLatestProducts = async (req, res) => {
  const products = await Product.find().sort({ created_at: -1 });
  return res.json(products);
};

// store products by filtering
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
