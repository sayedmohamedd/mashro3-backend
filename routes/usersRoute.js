const express = require('express');
const usersRouter = express.Router();
const usersController = require('./../controller/usersController.js');

usersRouter.post('/login', usersController.getLogin);
usersRouter.post('/register', usersController.getRegister);

module.exports = usersRouter;
