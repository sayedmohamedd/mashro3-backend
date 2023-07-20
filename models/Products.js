const { model, Schema } = require('mongoose');
const ProductSchema = new Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  price: {
    type: Number,
  },
  available: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  rate: {
    type: Number,
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  numberInStock: {
    type: Number,
  },
  category: {
    type: String,
  },
});

const ProductsModel = model('products', ProductSchema);

module.exports = ProductsModel;
