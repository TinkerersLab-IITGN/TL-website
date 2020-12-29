require('dotenv').config()

var express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser");

const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(methodOverride("_method"))

var indexRoutes = require("./routes/index")
app.use("/", indexRoutes)

// Server http://localhost:3000/
app.listen(process.env.PORT || 3000, function () {
  console.log("app is running...")
})
