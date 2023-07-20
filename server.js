const express = require('express');
const app = express();
const _port = 3002;
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());

const password = 'lluef3bYwG3Nk7kl';
const username = 'sayedmohamed123sm74';
mongoose.connect(
  'mongodb+srv://sayedmohamed123sm74:lluef3bYwG3Nk7kl@cluster0.itow9xs.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

// category route
const categoryRouter = require('./routes/categoryRoute');
app.use('/api', categoryRouter);

// products route
const productsRouter = require('./routes/productsRoute');
app.use('/api', productsRouter);

app.listen(_port, () => console.log(`server running on ${_port}`));
