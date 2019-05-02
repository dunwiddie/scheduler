const events = [];

exports.getAddEvent = (req, res, next) => {
  res.render("calendar", {
    pageTitle: "Add Event",
        events: events,
    path: "/calendar",
    "activeCalendar": true
  });
};

exports.postAddEvent = (req, res, next) => {
  console.log(req.body);
  events.push({ id: events.length + 1, name: req.body.eventName });
  console.log(events[events.length - 1]);
  res.redirect("/calendar");
};

exports.getEvents = (req, res, next) => {
  res.render("calendar", {
    events: events,
    pageTitle: "Calendar",
    path: "/calendar",
        hasEvents: events.length > 0,
        activeCalendar: true
    });
};
