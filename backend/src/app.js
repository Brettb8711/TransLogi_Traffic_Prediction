const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

module.exports = app;
