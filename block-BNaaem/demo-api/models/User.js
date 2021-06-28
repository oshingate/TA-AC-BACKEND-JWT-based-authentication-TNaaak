let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  books: { type: mongoose.Types.ObjectId, ref: 'Book' },
  comments: { type: mongoose.Types.ObjectId, ref: 'Comment' },
  cart: [{ type: mongoose.Types.ObjectId, ref: 'Book' }],
});

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

userSchema.methods.createToken = async function () {
  let payload = {
    name: this.name,
    email: this.email,
  };
  try {
    let token = await jwt.sign(payload, 'thisissecret');

    return token;
  } catch (error) {
    return error;
  }
};

let User = mongoose.model('User', userSchema);

module.exports = User;
