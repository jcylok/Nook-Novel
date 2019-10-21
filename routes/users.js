const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');

// INDEX
router.get('/', ctlr.users.index);

// FIND
router.get('/:id', ctlr.users.find);

// CREATE
router.post('/', ctlr.users.create);

// UPDATE
router.put('/:id', ctlr.users.update);

// DESTROY
router.delete('/:id', ctlr.users.destroy);

module.exports = router;