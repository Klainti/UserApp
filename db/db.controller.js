/**
 * Created by vchris on 12/7/2017.
 */


var User = require('./db.schema.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* Register a new user, if possible */
exports.UserRegister = (req, res) =>{

    User.findOne({email: req.body.email}, (err, user) => {
        if (err) throw err;

        if (!user){
            CreateUser();
        }else{
            res.status(409).json({ message: 'Email already in use' });
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

                    res.status(201).json({ message: 'User saved successfully!' });
                });
            });
        }
    });

};


exports.Authenticate = (req, res) =>{

    User.findOne({ email: req.body.email}, (err, user) =>{
        if (err) {
            throw err;
            res.status(500).json({ message: 'User not found' });
        }

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, res_compare) => {

                if (err) throw err;

                if (res_compare) {

                    return res.json({
                        token: jwt.sign({
                            firstname: user.firstname, lastname: user.lastname,
                            email: user.email, username: user.username,
                            address: user.address, _id: user._id
                        }, 'centaur!')
                    });

                } else {

                    res.status(401).json({message: 'Authentication failed. Incorrect email/password'});
                }

            });

        }else{
            res.status(401).json({message: 'Authentication failed. Incorrect email/password'});
        }

    });

};

exports.UserUpdate = (req, res) =>{

    var userid = jwt.decode(req.headers['authorization'].split(' ')[1])._id;

    User.findByIdAndUpdate(userid, {firstname: req.body.firstname, lastname: req.body.lastname,
                                    email: req.body.email, username: req.body.username,
                                    address: req.body.address}, (err) => {
        if (err) throw err;

        return res.json({token: jwt.sign({ firstname: req.body.firstname, lastname: req.body.lastname,
            email: req.body.email, username: req.body.username,
            address: req.body.address, _id:  req.body._id},  'centaur!')});

        console.log('FOUND USER');
    });

};

exports.PassUpdate = (req, res) =>{

    var userid = jwt.decode(req.headers['authorization'].split(' ')[1])._id;

    User.findOne( {_id: userid}, (err, user) =>{
        if (err) {
            throw err;
            res.status(409).json({ message: 'User not found' });
        }

        bcrypt.compare(req.body.oldpass, user.password, (err, res_compare) => {

            if (err) throw err;

            if (res_compare) {

                bcrypt.hash(req.body.newpass, 10, (err, hash) => {

                    if (err) throw err;

                    user.password = hash;

                    user.save((err) => {
                        if (err) throw err;
                    });

                    res.status(201).json({ message: 'User password saved successfully!' });

                });
            }else{
                res.status(400).json({ message: 'Wrong password' });
            }

        });

    });

};
