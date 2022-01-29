// Initialing router middleware
const router = require('express').Router();
const store = require('../db/store')

router.get('/notes', (req, res) => {
   store.getNotes().then((notes)=>{
       return res.json(notes);
   });
});

router.post('/notes', (req, res) => {

})

module.exports = router;