/**
 * Created by vchris on 12/7/2017.
 */

const express = require('express');
const router = express.Router();
const signup = require('../controllers/api/signup.con');
const login = require('../controllers/api/login.con');
const auth = require('../controllers/api/auth.con');
const home = require('../controllers/api/home.con');

router.post('/signup', signup);

router.post('/login', login);

router.get('/auth', auth);

router.get('/home', home);

module.exports = router;