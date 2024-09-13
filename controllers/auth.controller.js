const User = require('./../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { promisify } = require('util');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      status: 'fail',
      message: 'Please Provide Email & Password',
    });
  }

  const user = await User.findOne({ email });

  //   Check if User Exist
  if (!user) {
    return res.status(401).json({
      status: 'fail',
      message: "user doesn't exist",
    });
  }

  //   Check password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      status: 'fail',
      message: 'username or password is incorrect',
    });
  }

  //Create Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  //   remove password from response
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });

    //   Check if User already Exist
    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'user is already existed',
      });
    }

    //   Hashed Password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //   Create New User
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    // Remove password from res
    newUser.password = undefined;

    //Create Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
    // if (error instanceof mongoose.Error.ValidationError) {
    //   let errorList = [];
    //   for (let e in error.errors) {
    //     errorList.push({ msg: error.errors[e].message });
    //   }
    //   res.json(errorList);
    // } else {
    //   res.json(error);
    // }
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access',
    });
  }

  // 2) Verify token => if someone manipulate the data or token is expired
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token does no longer exist',
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

// exports.protect = catchAsync(async (req, res, next) => {
//   // 1) Getting token and check if it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }
//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please log in to get access.'),
//       401
//     );
//   }

//   // 2) Verify token => if someone manipulate the data or token is expired
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exist
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser)
//     return next(
//       new AppError('The user belonging to this token does no longer exist', 401)
//     );
//   // 4) Check if user changed password after the token was issued
//   // if (currentUser.changedPasswordAfter(decoded.iat)) {
//   //   return next(
//   //     new AppError('User recently changed password! Please log in again.', 401)
//   //   );
//   // }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   next();
// });
