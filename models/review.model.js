const { model, Schema } = require('mongoose');
const ReviewSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
  },
  product_id: {
    type: Schema.ObjectId,
  },
  text: {
    type: String,
  },
  rating: {
    type: Number,
  },
  likes: {
    type: Number,
  },
  comments: {
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

const Review = model('Review', ReviewSchema);

module.exports = Review;
