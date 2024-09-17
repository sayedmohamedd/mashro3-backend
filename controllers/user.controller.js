const catchAsync = require('../utils/catchAsync');
const User = require('./../models/user.model');

// Get All Users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

// Get One User by ID
exports.getUser = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const users = User.find({ _id: user_id });
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
