const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'username is already exsited'],
    minLength: [4, 'Name must be longer then 9 characters'],
    maxLength: [20, 'Name must be lesser then 50 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email is already exsited'],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password must be at least 8 characters'],
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
  updated_at: {
    type: Date,
    default: () => new Date(),
  },
});

const User = model('User', UserSchema);

module.exports = User;
