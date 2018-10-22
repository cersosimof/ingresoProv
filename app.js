var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// var DB = require('./db');

const mongoose = require('mongoose');
mongoose.connect('mongodb://'+user+':'+pass+'@'+port+'/'+dbName+'', { useNewUrlParser : true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRoute = require('./routes/login');
var altaRoute = require('./routes/alta');
var modifRoute = require('./routes/modif')
var logoutRoute = require('./routes/logout')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'facundo',
  store: new MongoStore({
    // url: 'mongodb://localhost/proveedores',
    url: 'mongodb://'+user+':'+pass+'@'+port+'/'+dbName+'',
    ttl: 14 * 24 * 60 * 60,
    resave: false,
    saveUninitialized: true // = 14 days. Default
  })
}));




/*ROUTES*/

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/login', loginRoute.login)
app.post('/login', loginRoute.iniciarSesion)

app.get('/alta', altaRoute.mostrarForm)
app.post('/alta', altaRoute.recibirForm)

app.get('/modif', modifRoute.mostrar)
app.post('/modif', modifRoute.modificar)

app.get('/logout', logoutRoute.logout)



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
