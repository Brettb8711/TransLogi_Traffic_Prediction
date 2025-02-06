const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeController = require('./controllers/routeController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Route optimization endpoint
app.post('/routes/optimize', routeController.optimizeRoutes);

module.exports = app;