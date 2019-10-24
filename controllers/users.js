const db = require('../models');

const error500 = () => {
  res.status(500).json({
    status: 500,
    error: [{ message: 'Something went wrong, please try again' }],
  });
};

// Creates One User
const create = (req, res) => {
  db.User.create(req.body, (err, createdUser) => {
    if (err) return console.log(err);

    res.json({
      status: 201,
      count: createdUser.length,
      data: createdUser,
      dateRequested: new Date().toLocaleString(),
    });
  });
};

// Index of All Users
const index = (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: allUsers.length,
      data: allUsers,
      dateRequested: new Date().toLocaleString()
    });
  });
};

// Finds One User by ID
const find = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: 1,
      data: foundUser,
      dateRequested: new Date().toLocaleString(),
    });
  });
};

// Updates One User by ID
const update = (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) return console.log(err);

      res.json({
        status: 200,
        count: updatedUser.length,
        data: updatedUser,
        dateRequested: new Date().toLocaleString(),
      });
    });
};

//look at pokedex trainers, modify directly, save

// Update WantToRead
const updateWantToRead = (req, res) => {
  // Find user to update
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(500);

    // Figure out if book already exists in list
    if (foundUser.booksWantToRead.includes(req.body.bookId)) {
      return res.status(200).json({
              message: "Book already saved!",
            });
    } else {

      foundUser.booksWantToRead.push(req.body.bookId)
      
      foundUser.save((err, updatedUser) => {
        if (err) {
          return res.json({
            status: 400,
            message: 'Something went wrong. Please try again.',
          });
        };

        res.json({
          status: 200,
          data: updatedUser,
          requestedAt: new Date().toLocaleString(),
        });
      });
    };
  });
};

// Update Read
const updateHaveRead = (req, res) => {
  // Find user to update
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(500);

    // Figure out if book already exists in list
    if (foundUser.booksRead.includes(req.body.bookId)) {
      return res.status(200).json({
              message: "Book already saved!",
            });
    } else {

      foundUser.booksRead.push(req.body.bookId)
      
      foundUser.save((err, updatedUser) => {
        if (err) {
          return res.json({
            status: 400,
            message: 'Something went wrong. Please try again.',
          });
        };

        res.json({
          status: 200,
          data: updatedUser,
          requestedAt: new Date().toLocaleString(),
        });
      });
    };
  });
};

// Update Read
const updateRecommended = (req, res) => {
  // Find user to update
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(500);

    // Figure out if book already exists in list
    if (foundUser.recommendedBooks.includes(req.body.bookId)) {
      return res.status(200).json({
              message: "Book already saved!",
            });
    } else {

      foundUser.recommendedBooks.push(req.body.bookId)
      
      foundUser.save((err, updatedUser) => {
        if (err) {
          return res.json({
            status: 400,
            message: 'Something went wrong. Please try again.',
          });
        };

        res.json({
          status: 200,
          data: updatedUser,
          requestedAt: new Date().toLocaleString(),
        });
      });
    };
  });
};


// Delete book from wantToRead
// Find the User to update

const deleteBookFromUser = () => {
  db.User.findById(req.params.id, (err, foundUser) => {
  // Delete the book by ID
  foundUser.booksWantToRead.findOne({ bookId: req.body.bookId}, (err, deletedBook) => {
    if (err) return console.log(err);

    
  })


  if (req.body.booksWantToRead) {
    db.Book.findByIdAndDelete( { id: req.body.id }, (err, deletedBook) => {
      if (err) return console.log(err);

      res.status(200).json({
        status: 200,
        data: deletedBook,
      });
    });
  };
  });
};

// Destroys One User by ID
const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: deletedUser.length,
      data: deletedUser,
      dateRequested: new Date().toLocaleString(),
    });
  })
}

module.exports = {
  create,
  index,
  find,
  update,
  updateWantToRead,
  updateHaveRead,
  updateRecommended,
  deleteBookFromUser,
  destroy,
};