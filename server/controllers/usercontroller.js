//LONG METHOD

// let express = require('express');
// let router = express.Router();
// let sequelize = require('../database'); //need to require the database
// let user = sequelize.import('../models/user.js');

//SHORT METHOD
const router = require('express').Router();
const User = require('../database').import('../models/user.js');
const jwt = require('jsonwebtoken'); //installed in package.json.  this is why we can access this library
const bcrypt = require('bcryptjs');

// router.get('/practice', function(req, res) { //.get (endpoint then callback function)
//     res.send('This is a practice route!')
// });


//Create a new endpoint : /create
//The endpoint is going to be a post request
//Have an object that matches the model of UserTable (email/password)
//Let sequelize create a new record in the database (create)
router.post('/create', function(req, res) {

    User.create({
            email: req.body.user.email,
            password: bcrypt.hashSync(req.body.user.password, 13) //13 is the number of times we are salting (crypting).  it defaults to 10
        })
        //.then res.send('This is our user/create endpoint!')  //This helps with error handling
        .then(function createSuccess(user) { //sequelize creates a brand new row in our database table and sends us a response.  (user) is the sequelize response 
            /*let token = jwt.sign({ id: user.id , email: user.email  -- can add more data in there but never should store sensitive data*}, 'i_am_secret', { expiresIn: 60 * 60 * 24 }); 60*60*24 tells it to expire in 24 hours (60 seconds * 60 minutes * 24 hours)*/
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({
                user: user, //called user since we're working with the user table in the database (USER PARAMETER)
                message: 'User successfully created',
                sessionToken: token,
                //let responseObject = {
                //user: user,
                //}
                //res.json(responseObject);
            });
        })
        .catch(err => res.status(500).json({ error: err }))
});

//VERIFY THAT THE USER WE CREATED ABOVE EXISTS AND CHECK THE USERNAME AND PASSWORD
//building a query in PGadmin (select * from users where email = req.body.user.email)

//Create a new endpoint : /login
//The endpoint is going to be a post request
//Build a query statement (Hard code in a user's email that exists in your database)
//Use FindOne
//Let sequelize return a success
// if we find one return user info and if user doesn't exist return "user does not exist"
router.post('/login', function(req, res) {
    User.findOne({
            where: {
                email: req.body.user.email
            }
        })
        .then(function loginSuccess(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function(err, matches) {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }); //if the user exists, create a token so they can use it
                        res.status(200).json({
                            user: user,
                            message: 'User successfully logged in',
                            sessionToken: token,
                        })
                    } else {
                        res.status(502).send({ error: 'Login Failed' })
                    }
                });
            } else {
                res.status(500).json({ error: 'User does not exist.' });
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

module.exports = router; //must export this to the app.js file so that it is included in our server (app.js is the only file read by the server)