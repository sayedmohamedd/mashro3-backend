const express = require('express');
const app = express();
const _port = 3002;
const hemlet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(hemlet());
app.use(express.json());

const password = 'lluef3bYwG3Nk7kl';
const username = 'sayedmohamed123sm74';
// const username = 'siksika';
// const password = 'M1o8HbWafWxztjXU';
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.itow9xs.mongodb.net/ecommerce?retryWrites=true&w=majority`
);

// Category route
const categoryRouter = require('./routes/categoryRoute');
app.use('/api', categoryRouter);

// pحroducts route
const productsRouter = require('./routes/productsRoute');
app.use('/api', productsRouter);

// Users Login & Regsiter Route
const usersRouter = require('./routes/usersRoute');
app.use('/api', usersRouter);

// Cart Route
const cartRouter = require('./routes/cartRoute');
app.use('/api', cartRouter);

app.listen(_port, () => console.log(`server running on ${_port}`));
