/**
 * Created by vchris on 13/7/2017.
 */

dbhandle = require('../../../db/db.controller');

module.exports = (req, res) => {

    console.log('GOT POST /api/login');

    //console.log(req.headers);

    dbhandle.Authenticate(req, res);

};
