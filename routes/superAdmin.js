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
var SuperAdmin = require('../models/superAdmin');
var SuperAdminController = require('../controllers/superAdmin');
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


router.get('/', SuperAdminController.loginRequired, SuperAdminController.superAdmin);
router.post('/signup', SuperAdminController.register);
router.post('/login', SuperAdminController.signIn);
router.put('/update',SuperAdminController.loginRequired, SuperAdminController.updateProfile);
router.put('/updatePassword', SuperAdminController.loginRequired, SuperAdminController.updatePassword);
router.post('/checkEmail', SuperAdminController.checkEmail);
router.put('/userTaskStatusUpdate', SuperAdminController.loginRequired, SuperAdminController.userTaskStatusUpdate);

// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
