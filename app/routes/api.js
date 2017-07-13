const express = require('express');
const router = express.Router();
const signupController = require('../controllers/api/signup.controller');
const loginController = require('../controllers/api/login.controller');
const authController = require('../controllers/api/auth.controller');

//controllers!
router.post('/signup', signupController.singup);
router.post('/login', loginController.login);
router.post('/auth', authController.auth);

module.exports = router;