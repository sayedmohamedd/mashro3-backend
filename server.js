const express = require('express');
const app = express();
const _port = 3002;
const hemlet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(hemlet());
app.use(express.json());

const password = 'lluef3bYwG3Nk7kl';
const username = 'sayedmohamed123sm74';
mongoose.connect(
  'mongodb+srv://sayedmohamed123sm74:lluef3bYwG3Nk7kl@cluster0.itow9xs.mongodb.net/ecommerce?retryWrites=true&w=majority'
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
