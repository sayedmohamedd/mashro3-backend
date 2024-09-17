const { model, Schema } = require('mongoose');
const slugify = require('slugify');

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
  stock: {
    type: Number,
  },
  description: {
    type: String,
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
  category: {
    type: String,
  },
  averageRating: {
    type: Number,
    default: 0,
  }, // Stores the average rating for quick access
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});

const Product = model('Product', ProductSchema);

module.exports = Product;
