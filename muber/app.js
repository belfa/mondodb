const express = require('express');

const app = express();

// Watch for incoming requestss of method GET
// to the reoute http://localhost:3050/api
app.get('/api', (req, res) => {
    res.send({ hi: 'there' });
});

module.exports = app;