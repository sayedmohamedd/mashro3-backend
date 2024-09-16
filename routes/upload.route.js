// upload.js
const { Router } = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./../utils/cloudinaryConfig');

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Specify the folder in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).json({ url: req.file.path }); // Send back the image URL
  } else {
    res.status(400).send('File upload failed.');
  }
});

module.exports = router;
