const db = require('../models');

// Creates One Book
const create = (req, res) => {
  db.Book.create(req.body, (err, createdBook) => {
    if (err) return console.log(err);

    res.json({
      status: 201,
      count: createdBook.length,
      data: createdBook,
      dateRequested: new Date().toLocaleString(),
    });
  });
};

// Shows All Books
const index = (req, res) => {
  db.Book.find({}, (err, allBooks) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: allBooks.length,
      data: allBooks,
      dateRequested: new Date().toLocaleString(),
    });
  });
};

const find = (req, res) => {
  db.Book.findOneByID(req.params.id, (err, foundBook) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: foundBook.length,
      data: foundBook,
      dateRequested: new Date().toLocaleString(),
    });
  });
};

// Updates One Book by ID
const update = (req, res) => {
  db.Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBook) => {
      if (err) return console.log(err);

      res.json ({
        status: 200,
        count: updatedBook.length,
        data: updatedBook,
        dateRequested: new Date().toLocaleString(),
      });
    });
};

// Destroys One Book by ID

const destroy = (req, res) => {
  db.Book.findByIDAndDelete(req.params.id, (err, deletedBook) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: deletedBook.length,
      data: deletedBook,
      dateRequested: new Date().toLocaleString(),
    });
  });
};

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
};