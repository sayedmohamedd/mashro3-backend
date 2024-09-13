const express = require('express');
const app = express();
const _port = 3002;
const hemlet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { config } = require('dotenv');

config();
app.use(cors());
app.use(hemlet());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));

// Routes
const productRouter = require('./routes/productRoute');
app.use('/api/v1/products', productRouter);

const categoryRouter = require('./routes/categoryRoute');
app.use('/api/v1/categories', categoryRouter);

const userRouter = require('./routes/userRoute');
app.use('/api/v1/users', userRouter);

const cartRouter = require('./routes/cartRoute');
app.use('/api/v1/cart', cartRouter);

const paymentRouter = require('./routes/payment.route');
app.use('/api/v1/payment', paymentRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

// app.use(globalHandlingError)

// Running Server on
app.listen(_port, () => console.log(`server running on ${_port}`));
