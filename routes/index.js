var express = require("express")
var router = express.Router()
// var passport = require("passport")
const cookieParser = require('cookie-parser');

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = {CLIENT_ID}
const client = new OAuth2Client(CLIENT_ID);

router.use(express.json());
router.use(cookieParser());

router.get("/", function (req, res) {
  res.render("index");
})

router.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})

router.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/booking')

})

router.get("/booking", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log(req.user);
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking", {loggedIn: true, email: req.user.email});
    // res.render("booking", {loggedIn: false});
  } else {
    // console.log("Not logged in");
    res.render("booking", {loggedIn: false});
  }
  // res.render("booking");
})

router.get("/booking_withoutLogin", function (req, res) {

  // if (req.user) {
  //   // console.log("Logged in");
  //   // console.log(req.user.emails[0].value);
  //   res.render("booking", {loggedIn: true, email: req.user.emails[0].value});
  // } else {
    // console.log("Not logged in");
    res.render("booking", {loggedIn: false});
  // }
  // res.render("booking");
})

router.get("/mehtaLaser_form", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/mehtaLaser_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/mehtaLaser_form", {loggedIn: false, email: "-"});
  }

})

router.get("/gccLaser_form", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/gccLaser_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/gccLaser_form", {loggedIn: false, email: "-"});
  }

})

router.get("/3dprinter_form", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/3dprinter_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/3dprinter_form", {loggedIn: false, email: "-"});
  }

})

router.get("/rolandVinylCutter_form", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/rolandVinylCutter_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/rolandVinylCutter_form", {loggedIn: false, email: "-"});
  }

})

router.get("/mehtaLaser_calendar", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("calendars/mehtaLaser_calendar", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("calendars/mehtaLaser_calendar", {loggedIn: false});
  }

})

router.get("/gccLaser_calendar", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("calendars/gccLaser_calendar", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("calendars/gccLaser_calendar", {loggedIn: false});
  }

})

router.get("/3dprinter_calendar", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("calendars/3dprinter_calendar", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("calendars/3dprinter_calendar", {loggedIn: false});
  }

})

router.get("/rolandVinylCutter_calendar", checkAuthenticated, function (req, res) {

  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("calendars/rolandVinylCutter_calendar", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("calendars/rolandVinylCutter_calendar", {loggedIn: false});
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

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/booking' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/booking');
//   }
// );

// router.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/booking');
// })

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/booking_withoutLogin')
      })

}

module.exports = router
