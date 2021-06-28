let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    let result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

userSchema.methods.createtoken = async function () {
  let payload = {
    name: this.name,
    email: this.email,
  };

  try {
    let token = await jwt.sign(payload, 'thisissecret');
    console.log('token', token);
    return token;
  } catch (error) {
    return error;
  }
};

let User = mongoose.model('User', userSchema);

module.exports = User;
