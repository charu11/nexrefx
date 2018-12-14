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
const smpp = require('smpp');
const session = new smpp.Session({host: '119.235.5.234', port: 5019});

const fileUpload = require('express-fileupload');

//routers
var index = require('./routes/index');
var user = require('./routes/user');
var admin = require('./routes/admin');
var sms = require('./routes/sms');
var otp = require('./routes/otp');
//Models
var User = require('./models/user');
var Admin = require('./models/admin');
var SMS = require('./models/sms');
var OTP = require('./models/otp');

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
app.use('/admin', admin);
app.use('/sms', sms);
app.use('/otp', otp);

let isConnected = false;
//MARK: init socket for otp
session.on('connect', () => {
  isConnected = true;
  console.log("session started")
  session.bind_transceiver({
      system_id: 'NEXGEN',
      password: 'Nexgen@1'
      // interface_version: 1,
      // system_type: '380666000600',
      // address_range: '+380666000600',
      // addr_ton: 1,
      // addr_npi: 1,
  }, (pdu) => {
    if (pdu.command_status == 0) {
        console.log('Successfully bound')
    }
    });
  });

//MARK: close socket for otp
session.on('close', () => {
  console.log('smpp is now disconnected')

  if (isConnected) {
    session.connect();    //reconnect again
  }
});

//MARK: error handle socket for otp
session.on('error', error => {
  console.log('smpp error', error)
  isConnected = false;
});
session.on('pdu', function (pdu) {

    if (pdu.command == 'deliver_sm') {

        const sms = {
            from: null,
            to: null,
            message: null
        }

        sms.from = pdu.source_addr.toString();
        sms.to = pdu.destination_addr.toString();

        if (pdu.message_payload) {
            sms.message = pdu.message_payload.message;
        }

        console.log(sms);

        session.deliver_sm_resp({
            sequence_number: pdu.sequence_number
        });

    }

});
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
