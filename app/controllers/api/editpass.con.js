/**
 * Created by vchris on 17/7/2017.
 */

dbhandle = require('../../../db/db.controller');

module.exports = (req, res) => {

    console.log('GOT PUT /api/editpass');

    dbhandle.PassUpdate(req, res);

};
