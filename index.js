const express = require("express");
//const ejs = require('ejs');
const path = require("path");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/apirouter");
const siteRouter = require("./routes/siterouter");
const errorController = require("./controllers/error");

const app = express();

// Middleware Pipeline
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

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

app.use("/", errorController.get404);

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
