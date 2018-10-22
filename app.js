var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb  = require('mongodb');
var nodemailer = require('nodemailer');
var https = require('https');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');

const fileUpload = require('express-fileupload');

//routers
var index = require('./routes/index');
var user = require('./routes/user');
var sms = require('./routes/sms');
//Models
var User = require('./models/user');
var SMS = require('./models/sms');

var jsonwebtoken = require('jsonwebtoken');
var app = express();
app.use(fileUpload());
var cors = require('cors');
app.use(cors());
app.use(express.static('/public'));
app.use('/public', express.static('/public'));

var portSelected = 8281;
var dbe = 'mongodb://localhost/nexzent-core';
app.listen(portSelected, function() {
  console.log('Nexgen Nexzent-core API App listening on port ' + portSelected);
});
mongoose.connect(dbe);
// var uri = "mongodb://pikanite:Pikanite@pikanite-shard-00-00-ctz3b.mongodb.net:27017,pikanite-shard-00-01-ctz3b.mongodb.net:27017,pikanite-shard-00-02-ctz3b.mongodb.net:27017/devpikanitedb?ssl=true&replicaSet=Pikanite-shard-0&authSource=admin";
// mongoose.connect(uri);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('Nexzent-core-log'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Token middleware
app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'nexzent_api'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});


/* Routes */
app.use('/', index);
app.use('/user', user);
app.use('/sms', sms);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
next(err);
});
//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
