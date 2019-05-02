const express = require('express');

const router = express.Router();

router.get('/api/calendar', (req, res) => {
    res.send(events);
});

router.post('/api/calendar', (req, res) => {
    // validate the request
    if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("New events must include a name longer than 3 characters.");

    return;
    }

  const event = {
    "id": events.length + 1,
    name: req.body.name
  };

  events.push(event);

  res.send(event);
});

router.get('/api/calendar/:id', (req, res) => {
  // 404 if no event with :id is found
  const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
        res.status(404).send(`No event with id ${req.params.id} was found.`);

        return;
  }

    res.send(event);
});

router.put('/api/calendar/:id', (req, res) => {
  // 404 if no event with :id is found
    const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    res.status(404).send(`No event with id ${req.params.id} was found.`);
        return;
  }

  // validate the request
    if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("Events must include a name longer than 3 characters.");

    return;
    }
    event.name = req.body.name;

  res.send(event);
});

router.delete('/api/calendar/:id', (req, res) => {
    // 404 if no event with :id is found
  const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
        res.status(404).send(`No event with id ${req.params.id} was found.`);
        return;
    }

    const index = events.indexOf(event);

    events.splice(index, 1);

    res.send(event);
});

module.exports = router;
