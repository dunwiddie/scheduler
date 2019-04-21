const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

// Listener
app.listen(3000, () => {
    console.log('Listening on port 3000.')
})