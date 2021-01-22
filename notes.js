/*
.GITIGNORE
.gitignore is utilized by git to ignore certain things when you push to your repository
we don't need to push node_modules because package.json has all of that in it
to ignore node_modules since we don't need it, we typed  in node_modules/
*/

/*
POSTMAN
In Postman make sure in headers there is Content-Type then application/json selected

---Add A Response to Our Server


ENDPOINTS

facebook.com/feed  (FEED)
swapi.dev/people/1  (PEOPLE/1)

Anything after the slash is an endpoint
*/

/*
DATABASES

Server and Database  -- In PGAdmin, right click database then create new database.  just need to add name
//We installed sequelize in package.json which helps the server and database talk with each other


//INITIAL SETUP

//1) Add server files
//2) find server file through command line and install package.json using npm init
//3) In .gitignore, type node_modules/
//4) Change what's in the package.json file and then type npm update in command line

*/

/*
JWT (JSON Web Token)
It's an identifier to be added to the body of a request, so that when you send a request, you send a token with it. 
If you go to a concert, after paying, they stamp your hand.  This stamp is similar to a token.  If you leave they will know you paid based on the token.
And just like a stamp that will wash away in a few days, the JSON token will wear off in a certain amount of time. This time is decided by the developer.
Every time a user does something, it sends a request to authenticate which is why the token is needed.
Cookies can be used instead of tokens

jsonwebtoken is a package installed in our package.json file

tokens have 3 things:
header:
payload(data)
verify signature

jwt.io
*/

/*
.ENV
package called dotenv holds data that we want hidden such as signature, etc.

setup .env file
in .env file create variable - we called it JWT_SESSION
in main file (app.js) require .env at top level.  this works because it's installed in package.json
in .gitignore include .env so it doesn't get send to git
then we can use this variable
*/

/*
BCRYPT (Storing a hashed password in the database)
We need to run an algorithm to encrypt our password.  One method is to use an npm package called bcrypt.js.  
It takes a value and applies an algorithm called a salt to it and returns a hash value.  The hash can then be decoded using the same algorithm
The client passes the password to the server.  The server applies the salt to encrypt it then passes it to the database
*/

/*
AUTHENTICATED ROUTES
- Protect other people from accessing these portions of the database
- This is where we use Middleware to act as a gate between the client and server
- If there is a token you are granted access.  If not, the request is rejected

*/

/*
CONNECTING FRONT END TO BACK END
In order to get the client-side started, we will need to initialize NPM similar to what was done server-side. 

cd into the client directory.
Run npm init. Make sure a package.json file is created.
Copy paste the following code into the package.json file and run npm update

{
    "name": "client",
    "version": "1.0.0",
    "main": "scripts.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "http-server"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "bootstrap": "^4.3.1",
        "http-server": "^0.11.1"
    },
    "devDependencies": {},
    "description": ""
}

This tutorial assumes you have a basic grasp on HTML, so we'll briefly summarize what we've done. 
Overall, we have created a single HTML file that will allow us to test our endpoints. Let's take a look at what we have so far by doing the following: 

1. CD into the server folder or right-click and open the server folder in the terminal in VS Code. Run the nodemon command (this must be done BEFORE starting the client)

2. CD into the client folder or right-click and open the client folder in the terminal in VS Code. Run the npm start command. 

3. In Chrome go to http://localhost:8080/ (Links to an external site.) and you should be able to see the HTML and CSS (which will look like the below screenshot). 
Note that none of the buttons will be working as we have not implemented any of the JS logic yet. You may see some errors regarding scripts in the terminal for the client. 
These are okay at this point as we do not have the script files up and running yet. 

Debugging
If you are not able to see the above result here are some things to try: 

- If the client will not open in http://localhost:8080/ (Links to an external site.) initially you may need to run npm install http-server --save in the client directory. 

- Make sure you are starting the server BEFORE you start the client. Try shutting them both down and restarting them in the correct order if it does not work the first time. 

-  If things are not showing up correctly after you restart the client and server, or add something afterward and try to hard refresh the webpage 
(command+shift+r  -or-  control+shift+r).

- Make sure that all of your files are saved so any changes made can take place. 

*/

/*
CORS ISSUES

Add this in middleware

module.exports = function(req, res, next){
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
};

then add app.use(require('./middleware/headers')); into the main app.js file

Now that we have the headers in order this should take care of the CORS error we were getting
*/