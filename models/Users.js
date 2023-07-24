const { model, models, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'username is already exsited'],
    minLength: [4, 'Name must be longer then 9 characters'],
    maxLength: [20, 'Name must be lesser then 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already exsited'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = models.users || model('users', UserSchema);

module.exports = UserModel;
