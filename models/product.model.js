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
  images: {
    type: [String],
  },
  numberInStock: {
    type: Number,
  },
  category: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = model('Product', ProductSchema);

module.exports = Product;
