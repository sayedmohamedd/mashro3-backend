const express = require('express');
const router = express.Router();

// Controllers
const {
  getAllProducts,
  getProductsByNameOrSlug,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');

// Upload Product Image
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinaryConfig');

// Creare Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Specify the folder in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
  },
});

const upload = multer({ storage });

// Routes

router
  .route('/')
  .get(getAllProducts)
  .post(protect, restrictTo('admin'), upload.single('image'), addProduct);

router
  .route('/:productId')
  .patch(protect, restrictTo('admin'), updateProduct)
  .delete(protect, restrictTo('admin'), deleteProduct);

// Get Product by Name or Slug
router.get('/:searchValue', getProductsByNameOrSlug);

module.exports = router;
