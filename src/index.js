const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.listen(process.env.PORT, () => console.log("🟢 Server ok"))

mongoose.connect(process.env.CONECTION_URL)
    .then(() => {
        console.log("🟢 DB Connected")
    })
    .catch(err => console.log("🔴 Server error: " + err.message));

app.use("/", routes);
