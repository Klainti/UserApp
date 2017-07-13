const dbhandle = require('../../../db/dbcontroller');

module.exports.login = function (req,res) {
    dbhandle.Authenticate(req, res);
};