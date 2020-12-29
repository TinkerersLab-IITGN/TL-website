var express = require("express")
var router = express.Router()
var passport = require("passport")

router.get("/", function (req, res) {
  res.render("index");
})

router.get("/booking", function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking", {loggedIn: true, email: req.user.emails[0].value});
  } else {
    // console.log("Not logged in");
    res.render("booking", {loggedIn: false});
  }

})

router.get("/events", function (req, res) {
  res.render("events");
})

router.get("/blogs", function (req, res) {
  res.render("blogs");
})

router.get("/inventory", function (req, res) {
  res.render("inventory");
})

router.get("/about", function (req, res) {
  res.render("about");
})

router.get("/contact", function (req, res) {
  res.render("contact");
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/booking' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/booking');
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/booking');
})


module.exports = router
