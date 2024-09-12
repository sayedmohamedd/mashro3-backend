const express = require('express');
const router = express.Router();

// Controllers
const { login, register } = require('../controllers/auth.controller.js');
const { getAllUsers, getUser } = require('../controllers/user.controller.js');

// Get All Users
router.route('/').get(getAllUsers);

// Geet User by ID
router.route('/:user_id').get(getUser);

// Login
router.post('/login', login);

// Register
router.post('/register', register);

module.exports = router;
