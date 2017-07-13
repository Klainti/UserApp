/**
 * Created by vchris on 13/7/2017.
 */

dbhandle = require('../../../db/db.controller');

module.exports = (req, res) => {

    console.log('GOT POST /api/signup');

    dbhandle.UserRegister(req, (callback) => {
        if (callback){
            res.send('ok');
        }else{
            console.log('USER REGISTER ERROR');
            res.send('error');
        }
    });

};