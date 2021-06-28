let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: String,
  description: String,
  categories: [String],
  tags: [String],
  price: [Number],
  quantity: [Number],
  CreatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  comments: { type: mongoose.Types.ObjectId, ref: 'Comment' },
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
