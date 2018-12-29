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
var Admin = require('../models/admin');
var AdminController = require('../controllers/admin')
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


router.get('/', AdminController.loginRequired, AdminController.admin);
router.post('/signup', AdminController.register);
router.post('/login', AdminController.signIn);
// router.post('/login', AdminController.signIn);
// router.put('/update', AdminController.loginRequired, AdminController.updateProfile);
// router.put('/updatePassword', AdminController.loginRequired, AdminController.updatePassword);
// router.post('/checkEmail', AdminController.checkEmail);
// router.post('/socialLogin', AdminController.SocialMediaLoginRegister);
//router.post('/loginreq', UserController.loginRequired); //Auth-Token-Test

// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
