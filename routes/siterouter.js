const express = require("express");
const path = require('path');

const rootDir = require("../utils/path");

const router = express.Router();


router.get('/', (req, res) => {
    res.render('home', { "pageTitle": "Scheduler" });
});

router.get('/about', (req, res) => {
    res.send('About page');
});

router.get('/calendar', (req, res) => {
    const calEvents = [
        {
            "id": 0,
            "title": "event1"
        },
        {
            "id": 1,
            "title": "event2"
        }
    ];
    res.render('calendar', { pageTitle: "Calendar", events: calEvents, hasEvents: calEvents.length > 0 });
})

module.exports = router;