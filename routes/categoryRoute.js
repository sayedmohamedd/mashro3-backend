const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('./../controller/categoryController.js');

categoryRouter.get('/categories', categoryController.getCategories);

module.exports = categoryRouter;
