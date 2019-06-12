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
var User = require('../models/user');
var CompanyController = require('../controllers/company');
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


router.get('/', CompanyController.loginRequired, CompanyController.company);
router.post('/signup', CompanyController.register);
router.post('/login', CompanyController.signIn);
router.put('/update', CompanyController.loginRequired, CompanyController.updateProfile);
router.put('/updatePassword', CompanyController.loginRequired, CompanyController.updatePassword);
router.put('/delete', CompanyController.loginRequired, CompanyController.deleteProfile);
router.post('/checkEmail', CompanyController.checkEmail);
//router.post('/socialLogin', UserController.SocialMediaLoginRegister);
router.post('/loginreq', CompanyController.loginRequired); //Auth-Token-Test

// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
