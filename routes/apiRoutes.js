// Initialing router middleware
const router = require('express').Router();
const { deleteNote } = require('../db/store');
const store = require('../db/store')

// Route to retrieve notes
router.get('/notes', (req, res) => {
   store.getNotes().then((notes)=>{
       return res.json(notes);
   });
});

// Route to post new note
router.post('/notes', (req, res) => {
    store 
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(400).json(err))
});



module.exports = router;