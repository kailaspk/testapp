const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Email Validation
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    unique:true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'please provide email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email format'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: [true, 'please provide password min 8 char'],
  },
  
}, { timestamps: true });

//auth token
userScheme.methods.generateAuthToken = async function () {
  const user = this
  console.log("=log==",user);
  const token = await jwt.sign({ _id: user._id.toString() }, 'blackcat', {
    expiresIn: "30d"
  })
  console.log("======the token====",token);
  return token
}

//check email and password
userScheme.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User Not Found')
  }
  if (password == user.password) {
    throw new Error('Invalid Credential')
  }
  return user
}

const User = mongoose.model('userDetails', userScheme)

module.exports = User