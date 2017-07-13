const express = require('express');
const router = express.Router();
const signupController = require('../controllers/api/signup.controller');
const loginController = require('../controllers/api/login.controller');

//controllers!
router.post('/signup', signupController.singup);
router.post('/login', loginController.login);

module.exports = router;