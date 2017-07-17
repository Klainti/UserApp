const express = require('express');
const router = express.Router();
const signupController = require('../controllers/api/signup.controller');
const loginController = require('../controllers/api/login.controller');
const authController = require('../controllers/api/auth.controller');
const editController = require('../controllers/api/edit.controller');

//controllers!
router.post('/signup', signupController.singup);
router.post('/login', loginController.login);
router.post('/auth', authController.auth);
router.put('/edit/password', editController.editPassword);
router.put('/edit', editController.editProfile);

module.exports = router;