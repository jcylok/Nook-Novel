const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./Book.js');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  DOB: Date,
  zipCode: String,
  email: String,
  password: String,
  likedGenres: [String],
  booksRead: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }],
  booksWantToRead: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }],
  recommendedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;