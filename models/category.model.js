const { model, Schema } = require('mongoose');
const CategorySchema = new Schema({
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = model('Category', CategorySchema);

module.exports = Category;
