require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
const expressLayouts = require('express-ejs-layouts');
var flash = require('express-flash-2');
const session = require('express-session');
var lessMiddleware = require('less-middleware');
var cookieParser = require('cookie-parser');
var fileupload = require("express-fileupload");

const {verify} = require('./middleware');


var app = express();
app.use(fileupload());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.json({limit: "200mb", extended: true}))
// app.use(express.urlencoded({ extended: true }));

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true }));

app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: '100mb'})); 
// app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 1000000 })); 

app.use(express.static(path.join(__dirname, 'public') ));

app.use(session({
  secret: 'secretshhhhhh',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(expressLayouts);
app.use(flash());




let conn = require('./config/DbConnect');
conn.connectToServer( function( err, client ) { // MAIN MONGO START

  console.log("app running");

  app.locals.helpers = require('./helpers');
  app.locals.moment = require('moment');

  // ROUTES
  var publicRouter = require('./routes/public')

  app.use('/recap-uploader/',publicRouter);


  console.log("*** DATETIME:", app.locals.moment().format("YYYY MM DD, HH:mm:ss"));

  // updaterService.createEmailCode()

})


module.exports = app;