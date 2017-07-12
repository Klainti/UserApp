/* Created by vchris on 12/7/2017. */

const express = require('express');
const router = express.Router();
const dbhandle = require('../../../../db/db.controller');


router.post('/signup', (req, res) => {

    console.log('GOT POST /api/signup');

    dbhandle.UserRegister(req, (callback) => {
        if (callback){
            res.send('ok');
        }else{
            console.log('USER REGISTER ERROR');
            res.send('error');
        }
    });

});

module.exports = router;
