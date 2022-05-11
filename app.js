
// REQUIREMENTS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var validator = require('express-validator')
const expresslayout = require('express-ejs-layouts');
var session = require('express-session')
var mysql = require('mysql')

//DATABASE REQUIREMENT
var connection = require('./lib/db')

// ROUTES
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
var purchaseRouter = require('./routes/purchase');

// APP DECLARATION
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SETTING UP LAYOUTS
app.set('layout', 'layouts/layout')
app.use(expresslayout)

// DECLARING ROUTE NAME
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/purchase', purchaseRouter);


// SETTING UP PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, 'public')));

// Setting up Morgan???
app.use(logger('dev'));

// SETTING UP BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// SETTING UP COOKIEPARSER
app.use(cookieParser());

// SETTING UP SESSION
app.use(session({
  secret: 'momBOjumBo',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:1200000}
}))


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

// SETTING UP FLASH
 app.use(flash());

// SETTING UP PORT
const port = process.env.PORT || 8080

app.listen(port, () => { 
  console.log(`Listening on port... ${port}`);
});

module.exports = app;
