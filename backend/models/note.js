const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    title: String,
    content: String
});

module.exports = mongoose.model('Note', noteSchema);