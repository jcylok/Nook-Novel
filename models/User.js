const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  DOB: Date,
  zipCode: String,
  email: String,
  password: String,
  likedGenres: [String],
  booksRead: [String],
  booksWantToRead: [String],
  recommendedBooks: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;