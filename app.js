var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),

  db = require('./models/db'),
  space = require('./models/space'),
  User = require("./models/users"),

  index = require('./routes/index'),
  users = require('./routes/users'),
  spaces = require('./routes/spaces'),
  home = require('./routes/home'),
  register = require('./routes/register'),
  login = require('./routes/login')
  http = require('http');

var passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo_app", {
  useMongoClient: true
});
  mongoose.Promise = global.Promise;

app.use(require("express-session")({
  secret: "one two three four",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/spaces', spaces);
app.use('/users', users);
app.use('/secret', home);
app.use('/register', register);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



if (!module.parent) {
  app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
  })
}
