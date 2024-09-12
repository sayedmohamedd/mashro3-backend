const User = require('./../models/user.model');

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = User.find();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get One User by ID
exports.getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const users = User.find({ _id: user_id });
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
