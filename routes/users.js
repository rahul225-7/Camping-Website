const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

// SHOW LOGIN FORM
router.get('/users/login', users.renderLogin);

router.get('/users/register', users.renderRegister);

// HANDLE REGISTER
router.post('/users/register', users.registerUser);

// HANDLE LOGIN
router.post(
  '/users/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/users/login'
  }),
  users.login
);

// LOGOUT
router.get('/users/logout', users.logout);

module.exports = router;
