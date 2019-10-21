const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');

// INDEX
router.get('/', ctlr.books.index);

// FIND
router.get('/:id', ctlr.books.find);

// CREATE
router.post('/', ctlr.books.create);

// UPDATE
router.put('/:id', ctlr.books.update);

// DESTROY
router.delete('/:id', ctlr.books.destroy);

module.exports = router;