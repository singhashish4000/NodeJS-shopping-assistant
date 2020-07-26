var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongosse = require('mongoose');
const config = require('./config');


const Item = require('./models/itemModel');
const Store = require('./models/storeModel');
const Cart = require('./models/cartModel');


const seed = require('./seed');

var indexRouter = require('./routes/index');
var assistRouter = require('./routes/assist');
mongosse.connect(config.database, (err) => {
  if(err) {
    console.log('Error', err);
  } else {
    console.log('Connected');}
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/assist',assistRouter);

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

app.listen(process.env.PORT || '3000', err => {
  console.log(`Server running on ${config.port}`)
});

module.exports = app;