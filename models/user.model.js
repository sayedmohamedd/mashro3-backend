const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'You should provide a userename'],
    unique: [true, 'username is already exsited'],
    maxlength: [20, 'Name must be less than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'You should provide an email'],
    unique: [true, 'Email is already exsited'],
  },
  password: {
    type: String,
    required: [true, 'You should provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You should provide a password confirm'],
    validate: function (el) {
      return (this.password = el);
    },
  },
  phone: {
    type: String,
    required: [true, 'You should provide a phone number'],
  },
  image: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model('User', UserSchema);

module.exports = User;
