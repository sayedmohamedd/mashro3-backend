const { model, Schema } = require('mongoose');
const CategorySchema = new Schema({
  name: {
    type: String,
  },
});

const Category = model('Category', CategorySchema);

module.exports = Category;
