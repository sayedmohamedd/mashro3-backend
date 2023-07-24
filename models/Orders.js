const { model, Schema, id } = require('mongoose');
const OrderSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
  },
  products: [
    {
      product_id: {
        type: Schema.ObjectId,
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

const OrdersModel = model('orders', OrderSchema);

module.exports = OrdersModel;
