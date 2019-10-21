const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');


// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);
router.delete('/logout', ctrl.auth.deleteSession);
router.get('/verify', ctrl.auth.verifyAuth);


// ----------------------------- PROFILE -------------------------- //

router.get('/profile/:userId', ctrl.auth.showProfile);


// ----------------------------- BOOK LIST -------------------------- //
router.get('/booklist', ctrl.auth.showProfile);




module.exports = router;
