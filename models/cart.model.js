const { model, Schema, SchemaTypes } = require('mongoose');
const CartSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
    },
    product: {
      type: SchemaTypes.ObjectId,
      ref: 'Product',
    },
    number: {
      type: Number,
      default: 1,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
  });
  next();
});

const Cart = model('Cart', CartSchema);

module.exports = Cart;
