require('dotenv').config()



//const cors = require('cors');



var express = require("express"),

  app = express(),

  methodOverride = require("method-override"),

  bodyParser = require("body-parser"),

  session = require('express-session');

const cookieParser = require('cookie-parser');



// const passport = require('passport');

// const cookieSession = require('cookie-session')

// require('./passport-setup');

//

// app.use(cookieSession({

//     name: 'tuto-session',

//     keys: ['key1', 'key2']

//   }))



//app.use(cors());



// app.use(passport.initialize());

// app.use(passport.session());



app.use(express.json());

app.use(cookieParser());

// Configure session middleware
app.use(session({
  secret: 'your-secret-key-change-this-in-production', // Change this to a secure random string
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

app.set("view engine", "ejs")

app.use(express.static("/tinkerers-lab/public"))

app.use(bodyParser.urlencoded({

  extended: true

}))

app.use(methodOverride("_method"))



app.use(function (req, res, next) {

res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');

res.setHeader('Access-Control-Allow-Credentials', true);

next();

})



var indexRoutes = require("./routes/index")

app.use("/tinkerers-lab", indexRoutes)



// Server http://localhost:3000/tinkerers-lab

app.listen(process.env.PORT || 3000, function () {

  console.log("app is running...")

})

