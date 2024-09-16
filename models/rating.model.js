const { Schema, model } = require('mongoose');
const ratingSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = model('Rating', ratingSchema);
module.exports = Rating;

// Rating.aggregate([
//     { $match: { product: productId } },
//     { $group: { _id: "$product", averageRating: { $avg: "$rating" } } }
//   ])
//   .then(result => {
//     // Update the product's average rating based on this result
//   });
