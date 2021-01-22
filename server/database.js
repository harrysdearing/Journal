//HOW CAN WE CONNECT TO THE DATABASE

const Sequelize = require('sequelize'); //creating a new instance of sequelize

//                                database name      , username   , password
const sequelize = new Sequelize('journal-walkthrough', 'postgres', 'password', {
    host: 'localhost', //hosting this on our local computer
    dialect: 'postgres'
});

//NEXT WE NEED TO AUTHENTICATE -- test the connection (NOT REQUIRED)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection works');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize

//app.js file is being read so we had to add the code below to require that this is listened to
//const sequelize = require('./database');
//sequelize.sync();