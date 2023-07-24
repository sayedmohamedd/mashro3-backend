const { model, Schema, SchemaTypes } = require('mongoose');
const CartSchema = new Schema({
  user_id: {
    type: SchemaTypes.ObjectId,
  },
  product_id: {
    type: SchemaTypes.ObjectId,
  },
  number: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  rate: {
    type: Number,
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

const CartModel = model('carts', CartSchema);

module.exports = CartModel;
