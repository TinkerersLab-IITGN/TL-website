var express = require("express")
var router = express.Router()
// var passport = require("passport")
const cookieParser = require('cookie-parser');

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '229423012134-u4dv6s53mpllopu3ig79o4njqr4cr2nl.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

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

router.post('/login', (req,res)=>{
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        return {
            userid: payload['sub'],
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        };
      }
      verify()
      .then((userInfo)=>{
          // Store user info in session instead of just cookie
          req.session.user = userInfo;
          req.session.token = token;
          req.session.isAuthenticated = true;
          
          // Also set cookie for backward compatibility
          res.cookie('session-token', token, {
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              maxAge: 24 * 60 * 60 * 1000,
              path: '/tinkerers-lab'
          });
          res.send('success')
      })
      .catch(err=>{
          console.error('Login verification failed:', err);
          res.status(401).send('error');
      });
})

router.get('/logout', (req, res)=>{
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        // Clear the cookie
        res.clearCookie('session-token', {
            path: '/tinkerers-lab'
        });
        res.redirect('/tinkerers-lab/booking')
    });
})

// router.get("/booking", function (req, res) {
//   res.render("booking");
// })

router.get("/booking", checkAuthenticatedOptional, function (req, res) {
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

router.get("/booking-login", function (req, res) {
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

router.get("/mehtaLaser-form", checkAuthenticated, function (req, res) {
  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/mehtaLaser_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/mehtaLaser_form", {loggedIn: false, email: "-"});
  }
})

router.get("/gccLaser-form", checkAuthenticated, function (req, res) {
  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/gccLaser_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/gccLaser_form", {loggedIn: false, email: "-"});
  }
})

router.get("/3dprinter-form", checkAuthenticated, function (req, res) {
  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/3dprinter_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/3dprinter_form", {loggedIn: false, email: "-"});
  }
})

router.get("/rolandVinylCutter-form", checkAuthenticated, function (req, res) {
  if (req.user) {
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("booking_forms/rolandVinylCutter_form", {loggedIn: true, email: req.user.email});
  } else {
    // console.log("Not logged in");
    res.render("booking_forms/rolandVinylCutter_form", {loggedIn: false, email: "-"});
  }
})

router.get("/mehtaLaser-calendar", checkAuthenticatedOptional, function (req, res) {
  if (req.user) {
    res.render("calendars/mehtaLaser_calendar", {loggedIn: true, email: req.user.email});
  } else {
    res.render("calendars/mehtaLaser_calendar", {loggedIn: false});
  }
})

router.get("/gccLaser-calendar", checkAuthenticatedOptional, function (req, res) {
  if (req.user) {
    res.render("calendars/gccLaser_calendar", {loggedIn: true, email: req.user.email});
  } else {
    res.render("calendars/gccLaser_calendar", {loggedIn: false});
  }
})

router.get("/3dprinter-calendar", checkAuthenticatedOptional, function (req, res) {
  if (req.user) {
    res.render("calendars/3dprinter_calendar", {loggedIn: true, email: req.user.email});
  } else {
    res.render("calendars/3dprinter_calendar", {loggedIn: false});
  }
})

router.get("/rolandVinylCutter-calendar", checkAuthenticatedOptional, function (req, res) {
  if (req.user) {
    res.render("calendars/rolandVinylCutter_calendar", {loggedIn: true, email: req.user.email});
  } else {
    res.render("calendars/rolandVinylCutter_calendar", {loggedIn: false});
  }
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

router.get('/logout-inventory', (req, res)=>{
  res.clearCookie('session-token');
  res.redirect('tinkerers-lab/inventory')

})

router.get("/inventory", checkAuthenticatedInventory, function (req, res) {

  if (req.user) {
    // console.log(req.user);
    // console.log("Logged in");
    // console.log(req.user.emails[0].value);
    res.render("inventory", {loggedIn: true, email: req.user.email});
    // res.render("booking", {loggedIn: false});
  } else {
    // console.log("Not logged in");
    res.render("inventory", {loggedIn: false, email: "-"});
  }
  // res.render("booking");
})

router.get("/inventory-login", function (req, res) {

// if (req.user) {
//   // console.log("Logged in");
//   // console.log(req.user.emails[0].value);
//   res.render("booking", {loggedIn: true, email: req.user.emails[0].value});
// } else {
  // console.log("Not logged in");
  res.render("inventory", {loggedIn: false, email: "-"});
// }
// res.render("booking");
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



function checkAuthenticatedOptional(req, res, next){
    // First check session
    if (req.session && req.session.isAuthenticated && req.session.user) {
        req.user = req.session.user;
        return next();
    }
    
    // Fall back to cookie-based authentication
    let token = req.cookies['session-token'];
    if (!token) {
        req.user = null;
        return next();
    }
    
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
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
          req.user = null;
          next();
      })
}

function checkAuthenticated(req, res, next){
    // First check session
    if (req.session && req.session.isAuthenticated && req.session.user) {
        req.user = req.session.user;
        return next();
    }
    
    // Fall back to cookie-based authentication
    let token = req.cookies['session-token'];
    if (!token) {
        return res.redirect('/tinkerers-lab/booking-login');
    }
    
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
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
          res.redirect('/tinkerers-lab/booking-login')
      })
}

function checkAuthenticatedInventory(req, res, next){
  // First check session
  if (req.session && req.session.isAuthenticated && req.session.user) {
      req.user = req.session.user;
      return next();
  }
  
  // Fall back to cookie-based authentication
  let token = req.cookies['session-token'];
  if (!token) {
      return res.redirect('/tinkerers-lab/inventory-login');
  }
  
  let user = {};
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
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
        res.redirect('/tinkerers-lab/inventory-login')
    })
}

module.exports = router

