const dbhandle = require('../../../db/dbcontroller');

module.exports.singup = (req, res) =>{

    dbhandle.UserRegister( req, (valid) =>{
        if (valid){
            res.send('ok');
        }else {
            res.send('Error, Email or password already exists');
        }
    });
}