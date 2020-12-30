require('dotenv').config()

//const cors = require('cors');

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

//app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs")
app.use(express.static("public"))
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
app.use("/", indexRoutes)

// Server http://localhost:3000/
app.listen(process.env.PORT || 3000, function () {
  console.log("app is running...")
})
