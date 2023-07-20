const { model, Schema } = require('mongoose');
const CategorySchema = new Schema({
  name: {
    type: String,
  },
});

const CategoriesModel = model('category', CategorySchema);

module.exports = CategoriesModel;
