/**
 * Created by vchris on 12/7/2017.
 */

const express = require('express');
const router = express.Router();
const signup = require('../controllers/api/signup.con');
const login = require('../controllers/api/login.con');

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;