var User = require('./dbSchema.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* Register a new user, if possible */
exports.UserRegister = (req, res,callback) =>{

    User.find({email: req.body.email}, (err, user) => {
        if (err) throw err;

        if (user.length != 0){
            res.status(409).json({ message: 'Email already exists!' });
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

                    res.status(201).json({ message: 'User saved successfully!' });
                    console.log('User saved successfully!');
                });
            });
        }
    });

}

exports.Authenticate = (req, res) =>{

    User.find({ email: req.body.email}, (err, user) =>{
        if (err) throw err;

        if (user.length != 0) {
            bcrypt.compare(req.body.password, user[0].password, (err, res_compare) => {

                if (err) throw err;

                if (res_compare) {
                    return res.json({token: jwt.sign({ email: user[0].email, username: user[0].username,firstname: user[0].firstname,lastname: user[0].lastname,address: user[0].address, _id: user[0]._id}, 'centaur!')});
                }else{
                    res.status(401).json({ message: 'Authentication failed. Wrong password' });
                }
            });
        }else{
            res.status(401).json({ message: 'Authentication failed. Wrong email/password' });
        }
    });

};

exports.UpdateUser = (req, res) =>{
    var id = jwt.decode(req.headers['authorization'].split(' ')[1])._id;

    // find user with id
    User.find({ _id: id}, (err, user) => {
        if (err) throw err;

        if (user.length !==0){

            //check if email exists!
            User.find({ email: req.body.email}, (err, newUser) =>{

                if (newUser.length !==0) {

                    if (newUser[0].email === user[0].email) { // same user!
                        user[0].username = req.body.username;
                        user[0].firstname = req.body.firstname;
                        user[0].lastname = req.body.lastname;
                        user[0].address = req.body.address;
                    } else {
                        return res.status(409).json({ message: 'Email already exists!' });
                    }
                } else{
                    user[0].email = req.body.email;
                    user[0].username = req.body.username;
                    user[0].firstname = req.body.firstname;
                    user[0].lastname = req.body.lastname;
                    user[0].address = req.body.address;
                }

                user[0].save((err) =>{
                    if (err) throw err;
                })

                return res.json({token: jwt.sign({ email: req.body.email, username: req.body.username,firstname: req.body.firstname,lastname: req.body.lastname,address: req.body.address, _id: id}, 'centaur!')});

            });
        }else{
            res.status(400).json({ message: 'Invalid id!' });
        }
    });
}

exports.UpdatePassword = (req, res) =>{
    var id = jwt.decode(req.headers['authorization'].split(' ')[1])._id;

    User.find({_id: id}, (err, user) =>{
        if (err) throw err;

        if (user.length != 0){
            bcrypt.compare(req.body.oldpassword, user[0].password, (err, res_compare) =>{

                if (res_compare){
                    bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
                        if (err) throw err;

                        user[0].password = hash;
                        user[0].save((err) =>{
                            if (err) throw err;
                        })
                    });
                }else{
                    res.status(400).json({ message: 'Edit password failed!' });
                }
            });

        }
    });
}