//CONTROLLER METHODS

//GET
//POST
//PUT
//DELETE

//THIS FIRST LOOKS AT APP.JS.  In app.use(/journal), it's first finding that route and saying what do you want me to do.  We then require it looks at this file
//and it sees a get for /practice where a function is then called that sends a response 'This is a practice route!'

const express = require('express'); //bring in the express engine
const router = express.Router();

const validateSession = require('../middleware/validate-session');
const Journal = require('../database').import('../models/journal');

router.get('/practice', validateSession, function(req, res) { //.get (endpoint then callback function)
    res.send('Hey! This is a practice route!')
});

router.post('/create', validateSession, (req, res) => {
    const journalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        owner: req.user.id //we had req.user = user in validate-session.js so we are able to grab the id from this user object
    }
    Journal.create(journalEntry)
        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ALL ENTRIES - Token not required
//A get in postman at http://localhost:3000/journal/ will give us all the entries
router.get('/', (req, res) => {
    Journal.findAll()
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ENTRIES BY USER - Need token
router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.idJournal.findAll({
            where: { owner: userid }
        })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ENTRIES BY TITLE
router.get('/:title', function(req, res) {
    let title = req.params.title;
    Journal.findAll({
            where: { title: title }
        })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

//WE ARE EDITING EXISTING DATA IN THE DATABASE
router.put('/update/:entryId', validateSession, function(req, res) {
    const updateJournalEntry = { //this contains the new values we are going to put in the database
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id } };

    Journal.update(updateJournalEntry, query) //this is what is going to be replaced
        .then((journals) => res.status(200).json(journals))
        .catch((err) => res.status(500).json({ error: err }));
});

//DELETING JOURNAL ENTRIES
router.delete('.delete/:id', validateSession, function(req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } }; //id allows a parameter to be passed through the URL to the server so we can use it later

    Journal.destroy(query)
        .then(() => res.status(200).json({ message: 'Journal Entry Removed' }))
        .catch((err) => res.status(500).json({ error: err }));
})


//we also need to create endpoint "journal" within app.js

module.exports = router;