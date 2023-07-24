const { model, Schema } = require('mongoose');
const ReviewsSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
  },
  product_id: {
    type: Schema.ObjectId,
  },
  rating: {
    type: Number,
  },
  comments: {
    type: String,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

const ReviewsModel = model('Reviews', ReviewsSchema);

module.exports = ReviewsModel;
