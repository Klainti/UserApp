const dbhandle = require('../../../db/dbcontroller');

module.exports.singup = (req, res) =>{

    dbhandle.UserRegister( req, res);
}