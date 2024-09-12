const Category = require('../models/category.model');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: 'fail',
      message: err.message,
    });
  }
};
