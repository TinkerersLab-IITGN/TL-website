var express = require("express")
var router = express.Router()
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser());

router.get("/", function (req, res) {
  res.render("index");
})

router.get("/index.html", function (req, res) {
  res.redirect("/tinkerers-lab");
})

router.get("/about.html", function (req, res) {
  res.redirect("/tinkerers-lab");
})

// router.get("/booking", function (req, res) {
//   res.render("booking");
// })

router.get("/booking", function (req, res) {
  res.render("booking", {loggedIn: true, email: "user@example.com"});
})

router.get("/booking-login", function (req, res) {
  res.render("booking", {loggedIn: true, email: "user@example.com"});
})

router.get("/mehtaLaser-form", function (req, res) {
  res.render("booking_forms/mehtaLaser_form", {loggedIn: true, email: "user@example.com"});
})

router.get("/gccLaser-form", function (req, res) {
  res.render("booking_forms/gccLaser_form", {loggedIn: true, email: "user@example.com"});
})

router.get("/3dprinter-form", function (req, res) {
  res.render("booking_forms/3dprinter_form", {loggedIn: true, email: "user@example.com"});
})

router.get("/rolandVinylCutter-form", function (req, res) {
  res.render("booking_forms/rolandVinylCutter_form", {loggedIn: true, email: "user@example.com"});
})

router.get("/mehtaLaser-calendar", function (req, res) {
  res.render("calendars/mehtaLaser_calendar", {loggedIn: true, email: "user@example.com"});
})

router.get("/gccLaser-calendar", function (req, res) {
  res.render("calendars/gccLaser_calendar", {loggedIn: true, email: "user@example.com"});
})

router.get("/3dprinter-calendar", function (req, res) {
  res.render("calendars/3dprinter_calendar", {loggedIn: true, email: "user@example.com"});
})

router.get("/rolandVinylCutter-calendar", function (req, res) {
  res.render("calendars/rolandVinylCutter_calendar", {loggedIn: true, email: "user@example.com"});
})


// router.get("/mehtaLaser-calendar", checkAuthenticated, function (req, res) {
//   if (req.user) {
//     // console.log("Logged in");
//     // console.log(req.user.emails[0].value);
//     res.render("calendars/mehtaLaser_calendar", {loggedIn: true, email: req.user.email});
//   } else {
//     // console.log("Not logged in");
//     res.render("calendars/mehtaLaser_calendar", {loggedIn: false});
//   }
// })

// router.get("/gccLaser-calendar", checkAuthenticated, function (req, res) {
//   if (req.user) {
//     // console.log("Logged in");
//     // console.log(req.user.emails[0].value);
//     res.render("calendars/gccLaser_calendar", {loggedIn: true, email: req.user.email});
//   } else {
//     // console.log("Not logged in");
//     res.render("calendars/gccLaser_calendar", {loggedIn: false});
//   }
// })

// router.get("/3dprinter-calendar", checkAuthenticated, function (req, res) {
//   if (req.user) {
//     // console.log("Logged in");
//     // console.log(req.user.emails[0].value);
//     res.render("calendars/3dprinter_calendar", {loggedIn: true, email: req.user.email});
//   } else {
//     // console.log("Not logged in");
//     res.render("calendars/3dprinter_calendar", {loggedIn: false});
//   }
// })

// router.get("/rolandVinylCutter-calendar", checkAuthenticated, function (req, res) {
//   if (req.user) {
//     // console.log("Logged in");
//     // console.log(req.user.emails[0].value);
//     res.render("calendars/rolandVinylCutter_calendar", {loggedIn: true, email: req.user.email});
//   } else {
//     // console.log("Not logged in");
//     res.render("calendars/rolandVinylCutter_calendar", {loggedIn: false});
//   }
// })

router.get("/events", function (req, res) {
  res.render("events");
})

router.get("/blogs", function (req, res) {
  res.render("blogs");
})

router.get("/inventory", function (req, res) {
  res.render("inventory", {loggedIn: true, email: "user@example.com"});
})

router.get("/inventory-login", function (req, res) {
  res.render("inventory", {loggedIn: true, email: "user@example.com"});
})

router.get("/about", function (req, res) {
  res.render("about");
})

router.get("/contact", function (req, res) {
  res.render("contact");
})

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/booking' }),

//   function(req, res) {

//     // Successful authentication, redirect home.

//     res.redirect('/booking');

//   }

// );



module.exports = router
