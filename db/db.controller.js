/**
 * Created by vchris on 12/7/2017.
 */


var User = require('./db.schema.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* Register a new user, if possible */
exports.UserRegister = (req, callback) =>{

    User.find({email: req.body.email}, (err, user) => {
        if (err) throw err;

        if (user.length != 0){
            callback(false);
            console.log('Already exists');
            return 'Not valid username. Already Exists!';
        }
        else{
            CreateUser();
        }

        function CreateUser(){

            bcrypt.hash(req.body.password, 10, (err, hash) => {

                var newUser = User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    address: req.body.address,
                });

                newUser.save((err) => {
                    if (err) throw err;

                    callback(true);

                    console.log('User saved successfully!');
                });
            });
        }
    });

};

/*
exports.Authenticate = (req, res) =>{

    User.find({ email: req.body.email}, (err, user) =>{
        if (err) throw err;

        if (user.length != 0) {
            bcrypt.compare(req.body.password, user[0].password, (err, res_compare) => {

                if (err) throw err;

                if (res_compare) {
                    //res.send('HELLO');

                    return res.json({token: jwt.sign({ email: user[0].email, username: user[0].username, _id: user[0]._id}, 'centaur!')});

                }else{
                    res.status(401).json({ message: 'Authentication failed. Wrong password' });
                }
            });
        }else{
            res.status(401).json({ message: 'Authentication failed. Wrong email/password' });
        }
    });

};
*/