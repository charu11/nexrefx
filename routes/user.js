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


router.get('/', UserController.user);
router.post('/signup', UserController.register);
router.post('/login', UserController.signIn);
router.put('/update/', UserController.loginRequired, UserController.updateProfile);
router.put('/updatePassword/', UserController.loginRequired, UserController.updatePassword);
router.post('/checkEmail', UserController.checkEmail);
//router.post('/socialLogin', UserController.SocialMediaLoginRegister);
router.post('/loginreq', UserController.loginRequired); //Auth-Token-Test
router.delete('/deleteUser', UserController.loginRequired, UserController.deleteUserProfile)
// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
