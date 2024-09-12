const { model, Schema, SchemaTypes } = require('mongoose');
const OrderSchema = new Schema({
  user_id: {
    type: SchemaTypes.ObjectId,
  },
  products: [
    {
      product_id: {
        type: SchemaTypes.ObjectId,
      },
      quantity: {
        type: {
          Number,
        },
      },
      price: {
        type: Number,
      },
    },
  ],
  total_price: {
    type: Number,
  },
  status: {
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

const Order = model('Order', OrderSchema);

module.exports = Order;
