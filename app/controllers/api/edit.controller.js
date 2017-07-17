const dbhandle = require('../../../db/dbcontroller');

module.exports.editProfile = function (req,res) {
    dbhandle.UpdateUser(req, res);
};

module.exports.editPassword = function (req,res) {
    dbhandle.UpdatePassword(req, res);
};