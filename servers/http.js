// настройка сервера
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const acpRouter = require('../routes/acp.js');
const authRouter = require('../routes/authorisation.js');
const mainRouter = require('../routes/main.js');


const server = express();

// view engine setup
server.set('views', path.join(__dirname, '../views'));
server.set('view engine', 'ejs');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, '../public')));

server.use(session({
  secret: 'somethingStupidThings',  // 'salt' some information only for me for create ID in diferent ways
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/productJWT',
  }),
  cookie: { secure: false } // false because true is for https (for real projects)
}));

server.use('/', mainRouter);
server.use('/acp', acpRouter);
server.use('/authorisation', authRouter);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
