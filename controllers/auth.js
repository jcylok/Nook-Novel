const bcrypt = require('bcryptjs');
const db = require('../models');

// POST Create User
const createUser = (req, res) => {
  db.User.findOne( { email: req.body.email }, (err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      error: [{ message: 'Something went wrong, please try again' }],
    });

    if (foundUser) return res.status(400).json({
      status: 400,
      error: [{ message: 'Invalid request. Please try again."' }],
    });

    // Create Salt Rounds
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({
        status: 500,
        error: [{ message: 'Something went wrong. Please try again.' }],
      });

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(500).json({
          status: 500,
          error: [{ message: 'Something went wrong. Please try again.'}],
        });
      

        // Can change sign up form
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        };

        db.User.create(newUser, (err, createdUser) => {
          if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong. Please try again.'}],
          });


          res.status(201).json({
            status: 201,
          });
        });
      });
    });
  });
};