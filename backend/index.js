const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const noteRoutes = require('./routes/note_routes.js');
const app = express();

mongoose.connect(process.env.MONGO_DB_URI);

app.use(cors());
app.use(express.json());
app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
    res.json({message: "API works"});
});

app.listen((process.env.PORT), () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});