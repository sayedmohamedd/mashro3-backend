const CategoryModel = require('./../models/Categories');

exports.getCategories = async (req, res) => {
  const categories = await CategoryModel.find();
  return res.json(categories);
};
