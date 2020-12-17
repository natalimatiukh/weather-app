var createError = require('http-errors');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');

const fetch = require('node-fetch');
var logger = require('morgan');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
const {City} = require("./public/src/models/city");

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(adminRouter);


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

app.get('/(:admin)?', async function (req, res) {
    const cities = await City.find();
    var city = req.params.city;
    var appId = 'b5018676b6c9e7d01aa7056fd2b9186d';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`;
    var result = await fetch(url);
    var weather = await result.json();
    console.log("rendering");
    res.render('weather.hbs', {city, weather, cities})
});

module.exports = app;

