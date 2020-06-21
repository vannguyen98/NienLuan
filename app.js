var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const sequelize = require('./config/sequelize.config');

sequelize.authenticate()
.then(()=>{
  console.log('Connection has been established successfully.');
})
.catch(error=>{
  console.error('Unable to connect to the database:', error);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css',express.static(path.join(__dirname, '/css/')));
app.use('/js',express.static(path.join(__dirname, '/js/')));
app.use('/fonts',express.static(path.join(__dirname, '/fonts/')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
