const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/note.js");

const router = express.Router();

//GET to get data from the DB
router.get('/', (req, res) => {
    Note.find().exec().then((results) => {
        console.log(results);
        res.status(200).json(results);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

//POST to add a new note
router.post('/', (req, res) => {
    console.log(req);
    const note = new Note({
        //_id: mongoose.Schema.Types.ObjectId,
        title: req.body.title,
        content: req.body.content
    });
    //save it into the MongoDB database
    note.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'Note created',
            createdNote: result
        })
    }).catch((err) => {
            console.log(err);
            res.status(500).json({error: err});
    });
});

//DELETE to delete a note
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Note.deleteOne({_id: id}).exec().then((result) => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;