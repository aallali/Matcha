var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler')
const bodyParser = require('body-parser');
const io       	      = require("socket.io-client");
let socket 			  = io.connect("http://10.12.12.4:3000")


var indexRouter = require('./routes/index');
var home        = require('./routes/home');
var editprofile = require('./routes/edit_profile');
var profile     = require('./routes/profile');
var register    = require('./routes/register');
var login       = require('./routes/login');
var chat        = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// call of the routes 
app.use('/', indexRouter);
app.use('/home', home);
app.use('/editprofile',editprofile);
app.use('/profile', profile);
app.use('/register', register);
app.use('/login', login);

app.use('/chat', chat);

app.use(errorHandler({ dumpExceptions: true, showStack: true })); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
