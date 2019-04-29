const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require("body-parser");

const apiRouter = require("./routes/apirouter")
const siteRouter = require("./routes/siterouter");

const app = express();

// Middleware Pipeline
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const events = [
    { "id": 0, "name": "defaultEvent0" },
    { "id": 1, "name": "defaultEvent1" },
    { "id": 2, "name": "defaultEvent2" },
    { "id": 3, "name": "defaultEvent3" }
];

app.engine('.hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs')

// Routes
app.use(apiRouter);
app.use(siteRouter);

/*
    /                   index
    /about              about
    /calendar           calendar
    /api/calendar       api calendar
    /api/calendar/#     api event at calendar[#]
*/

app.use('/add-event', (req, res, next) => {
    console.log(req.body);
    events.push({ "id": events.length + 1, "name": req.body.title });
    console.log(events[events.length - 1]);
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    res.status(404).send("Sorry. There doesn't seem to be anything there")
});

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})