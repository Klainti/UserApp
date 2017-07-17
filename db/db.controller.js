/**
 * Created by vchris on 12/7/2017.
 */


var User = require('./db.schema.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* Register a new user, if possible */
exports.UserRegister = (req, res) =>{

    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            throw err;
            res.status(500).json({ message: 'Server error' });
        }

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
            res.status(500).json({ message: 'Server error' });
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
    console.log('header ' + req.headers['authorization'].split(' ')[1]);
    console.log('userid ' + userid);

    User.findOne( {_id: userid}, (err, user1) =>{
        if (err) {
            throw err;
            return res.status(409).json({ message: 'Server error' });
        }

        if (!user1){
            return res.status(409).json({message: 'User not found'});
        }else{

            if (user1.email === req.body.email) {
                user1.firstname = req.body.username;
                user1.lastname = req.body.lastname;
                user1.username = req.body.username;
                user1.address = req.body.address;

                user1.save((err) => {
                    if (err) throw err;
                });

                return res.json({
                    token: jwt.sign({
                        firstname: req.body.firstname, lastname: req.body.lastname,
                        email: req.body.email, username: req.body.username,
                        address: req.body.address, _id: userid
                    }, 'centaur!')
                });
            } else {
                console.log('new email');
                User.findOne({email: req.body.email}, (err, user2) => {
                    if (err) {
                        throw err;
                        return res.status(409).json({message: 'Server error'});
                    }

                    if (user2) {
                        console.log('User already in db');
                        return res.status(409).json({message: 'Email already in use'});
                    } else {
                        user1.firstname = req.body.username;
                        user1.lastname = req.body.lastname;
                        user1.email = req.body.email;
                        user1.username = req.body.username;
                        user1.address = req.body.address;

                        user1.save((err) => {
                            if (err) throw err;
                        });

                        return res.json({
                            token: jwt.sign({
                                firstname: req.body.firstname, lastname: req.body.lastname,
                                email: req.body.email, username: req.body.username,
                                address: req.body.address, _id: userid
                            }, 'centaur!')
                        });
                    }

                });
            }
        }
    });

};

exports.PassUpdate = (req, res) =>{

    var userid = jwt.decode(req.headers['authorization'].split(' ')[1])._id;

    User.findOne( {_id: userid}, (err, user) =>{
        if (err) {
            throw err;
            res.status(500).json({ message: 'Server error' });
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
