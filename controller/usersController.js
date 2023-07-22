const UserModel = require('./../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login
exports.getLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ msg: "user doesn't exist", success: false });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      msg: 'username or password is incorrect',
      success: false,
    });
  }
  const token = jwt.sign({ id: user._id }, 'ssiikkaa');
  return res.json({
    token,
    userId: user._id,
    msg: 'login successfully',
    success: true,
  });
};

// register
exports.getRegister = async (req, res) => {
  const { username, email, password, phone } = req.body;
  const user = await UserModel.findOne({ $or: [{ username }, { email }] });
  if (user) {
    return res.json({ msg: 'already exists', success: false });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await new UserModel({
    username,
    email,
    password: hashedPassword,
    phone,
  });
  await newUser.save();
  return res.json({ msg: 'user created', success: true });
};
