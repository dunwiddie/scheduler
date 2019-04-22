const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Middleware Pipeline
app.use(express.json());

const events = [
    { "id": 0, "name": "defaultEvent0" },
    { "id": 1, "name": "defaultEvent1" },
    { "id": 2, "name": "defaultEvent2" },
    { "id": 3, "name": "defaultEvent3" }
];

app.engine('.hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs')

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/calendar', (req, res) => {
    res.send('Calendar page');
})

/*
    /                   index
    /about              about
    /calendar           calendar
    /api/calendar       api calendar
    /api/calendar/#     api event at calendar[#]
*/

app.get('/api/calendar', (req, res) => {
    res.send(events);
});

app.post('/api/calendar', (req, res) => {

    //validate the request
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send(`New events must include a name longer than 3 characters.`);
        return;
    }

    const event = {
        "id": events.length + 1,
        "name": req.body.name
    };
    events.push(event);

    res.send(event);
})

app.get('/api/calendar/:id', (req, res) => {

    // 404 if no event with :id is found
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send(`No event with id ${req.params.id} was found.`);
        return;
    }

    res.send(event);
});

app.put('/api/calendar/:id', (req, res) => {

    // 404 if no event with :id is found
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send(`No event with id ${req.params.id} was found.`);
        return;
    }

    // validate the request
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send(`Events must include a name longer than 3 characters.`);
        return;
    }
    event.name = req.body.name;

    res.send(event);
})

app.delete('/api/calendar/:id', (req, res) => {

    // 404 if no event with :id is found
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
        res.status(404).send(`No event with id ${req.params.id} was found.`);
        return;
    }

    const index = events.indexOf(event);
    events.splice(index, 1);

    res.send(event);
})


// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})