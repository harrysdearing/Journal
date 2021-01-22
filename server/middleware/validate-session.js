const jwt = require('jsonwebtoken');
const User = require('../database').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token --> ', token);

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => { //we're calling upon the JWT package and invoking the verify method which decodes the token
            console.log('decodeToken --> ', decodeToken);
            if (!err && decodeToken) {
                User.findOne({
                        where: {
                            id: decodeToken.id
                        }
                    })
                    .then(user => {
                        console.log('user --> ', user);
                        if (!user) throw err;
                        console.log('req --> ', req);
                        req.user = user;
                        return next();
                    })
                    .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;

/*
To work, we had to do a post from http://localhost:3000/user/login and use a valid login from our database
This then returned a sessionToken, which we needed to copy

After copying this token, we went to http://localhost:3000/journal/practice
In the headers, we added Authorization and a the sessionToken we copied in the previous step

Then it works
*/