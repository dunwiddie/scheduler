const express = require('express');

const eventsController = require('../controllers/events');

const router = express.Router();

router.get('/', (req, res) => {
  res.render("home", { pageTitle: "Scheduler" });
});

router.get('/about', (req, res) => {
  res.render("about", { pageTitle: "About Scheduler" });
});

router.get('/calendar', eventsController.getAddEvent);

router.post('/calendar', eventsController.postAddEvent);

module.exports = router;
