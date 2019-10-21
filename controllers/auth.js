const bcrypt = require('bcryptjs');
const db = require('../models');

const error500 = () => {
  res.status(500).json({
    status: 500,
    error: [{ message: 'Something went wrong, please try again' }],
  });
};

// POST Create User
const createUser = (req, res) => {
  db.User.findOne( { email: req.body.email }, (err, foundUser) => {
    if (err) return error500();

    if (foundUser) return res.status(400).json({
      status: 400,
      error: [{ message: 'Invalid request. Please try again.' }],
    });

    // Create Salt Rounds
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return error500();

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return error500();
      
        // Can change sign up form
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        };

        db.User.create(newUser, (err, createdUser) => {
          if (err) return error500();

          res.status(201).json({
            status: 201,
          });
        });
      });
    });
  });
};


// POST Create Session
const createSession = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return error500();

    if (!foundUser) return res.status(400).json({
      status: 400,
      error: [{ message: 'Username or password is incorrect.'},]
    });

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return error500();

      if (isMatch) {
        req.session.currentUser = foundUser._id;
        return res.status(201).json({
          status: 201,
          data: { id: foundUser._id },
        });
      } else {
        return res.status(400).json({
          status: 400,
          error: [{ message: 'Username or password is incorrect.' }],
        });
      };
    });
  });
};

module.exports = {
  createUser,
  createSession,
}