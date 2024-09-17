// Models
const User = require('./../models/user.model');
// Packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Utils
const { promisify } = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please Provide Email & Password', 400));
  }

  const user = await User.findOne({ email });

  //   Check if User Exist
  if (!user) {
    return next(new AppError("user doesn't exist", 404));
  }

  //   Check password is correct
  const isPasswordValid = await bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError('username or password is incorrect', 401));
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
});

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, phone } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });

  //   Check if User already Exist
  if (user) {
    return next(new AppError('user is already existed', 400));
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
});

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
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // 2) Verify token => if someone manipulate the data or token is expired
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

exports.restrictTo = (role) => (req, res, next) => {
  if (req.user.role === role) {
    return next();
  }
  return next(new AppError("you don't have this access", 403));
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
