'use strict'

var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var http = require('http');
var url = require('url');
var fs = require('fs');
var OTP = require('../models/otp');
var otpController = require('../controllers/otp')
app.use(cors())
router.use(cors())



//support on x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get('/', otpController.loginRequired, otpController.otp);
router.post('/send_otp', otpController.send_otp);
router.post('/send_otp_system', otpController.loginRequired, otpController.send_otp);
//router.post('/send_bulk', smsController.loginRequired, smsController.send_bulk);
//router.post('/loginreq', UserController.loginRequired); //Auth-Token-Test

// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
