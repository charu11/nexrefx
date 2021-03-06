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
var category = require('../models/category');
var CategoryController = require('../controllers/category');
var UserController = require('../controllers/user');
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


router.get('/', UserController.loginRequired, CategoryController.category);
router.post('/categoryDetails', UserController.loginRequired, CategoryController.categoryDetails);
//router.post('/login', UserController.signIn);
router.put('/updateCategory', UserController.loginRequired, CategoryController.updateCategory);
//router.put('/updatePassword/', UserController.loginRequired, UserController.updatePassword);
//router.post('/checkEmail', UserController.checkEmail);
//router.post('/socialLogin', UserController.SocialMediaLoginRegister);
router.post('/loginreq', UserController.loginRequired); //Auth-Token-Test

// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
