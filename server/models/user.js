const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; 
    },
  },
  googleId: {
    type: String, 
    default: null,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car', 
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
