const express = require('express');
const router = express.Router();
const signupController = require('../controllers/api/signup.controller');

//controllers!
router.post('/signup', signupController.singup);

module.exports = router;