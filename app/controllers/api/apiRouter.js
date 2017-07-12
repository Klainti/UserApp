/**
 * Created by vchris on 12/7/2017.
 */

const express = require('express');
const noauthRouter = express.Router();
const authRouter = express.Router();

const noauth = require('./noauth/noauth.login');


noauthRouter.use('/', noauth);

module.exports = (true) ? noauthRouter : authRouter;