const Category = require('../models/category.model');
const catchAsync = require('./../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    data: {
      categories,
    },
  });
});
