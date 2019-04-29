const express = require("express");
const path = require('path');

const rootDir = require("../utils/path");

const router = express.Router();


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.send('About page');
});

router.get('/calendar', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'calendar.html'));
})

module.exports = router;