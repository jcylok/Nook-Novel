const db = require('../models');

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

// Finds One User by Name
const find = (req, res) => {
  db.User.findOne({ name: req.params.name }, (err, foundUser) => {
    if (err) return console.log(err);

    res.json({
      status: 200,
      count: foundUser.length,
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
  });
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};