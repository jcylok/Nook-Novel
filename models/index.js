const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-one';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MONGODB CONNECTED'))
  .catch((err) => console.log(err));

  module.exports = {
    User: require('./User'),
    Book: require('./Book'),
  };