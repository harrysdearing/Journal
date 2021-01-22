//this is your main hub because of the package.json file
//this is how to set up the server
//then in the terminal below i typed node app.js
//ctrl + C will stop the server at any time
//ONCE CONNECTED --USE NODEMON TO RECONNECT

//REQUIRE ALLOWS US TO PULL IN SOMETHING FROM ANOTHER FILE
require('dotenv').config(); //require it at the top level and make items in an .env file available to our whole application
let express = require('express'); //we are importing this using express.  this is one of the node_modules we have within package.json
const app = express();
let journal = require('./controllers/journalcontroller');
const sequelize = require('./database');
let user = require('./controllers/usercontroller.js');


sequelize.sync(); //method to ensure all of our models and tables in our server are put onto the database if they're not there
app.use(require('./middleware/headers'));

//creating a method called app.use  --- app.use(endpoint, callback function)   ----callback function is the function that will run when a certain endpoint is hit
//       app.use('/test', function(req,res){       -----    When /test is hit, we want to run that function, which always has 2 parameters (request and response)
//          res.send('This is a test route')       -----    When we hit it, we run a response called 'This is a test route'
//       })


/* 
ENDPOINT REFERENCES

app.use('/test', function(req, res) {
    res.send('This is a message from the test endpoint on the server!');
});

app.use('/harry', function(req, res) {
    res.send('My name is Harry and I am 36 years old');
});

*/
//Have endpoint of journal/ practice
//send a response from that endpoint (This is a practice route)

app.use(express.json()); //this is what allows us to accept the JSON into our server

app.use('/user', user);
/*
app.use(require('./middleware/validate-session')); // anything below thiswill require a token to access, thus becoming protected
since we don't want to use it in the entire journal file, we will inject it directly into the journalcontroller file
*/
app.use('/journal', journal); //REQUIRE ALLOWS US TO PULL IN SOMETHING FROM ANOTHER FILE


app.listen(3000, function() {
    console.log('App is listening on port 3000');
});

//ctrl c then click npm start to run this again

//IN ORDER TO CONNECT TO SERVER - I had to click npm install -g nodemon  ***IMPORTANT
//this will watch for any changes I make and update my package.json file