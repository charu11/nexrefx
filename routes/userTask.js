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
var userTask = require('../models/userTask');
var UserTaskController = require('../controllers/userTask');
var UserController = require('../controllers/user');
var SuperAdminController = require('../controllers/superAdmin')
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


router.get('/', /* UserController.loginRequired,*/ UserTaskController.userTask);
router.post('/addUserTask', SuperAdminController.loginRequired,UserTaskController.addUserTask);
//router.post('/login', UserController.signIn);
router.put('/updateUserTask', SuperAdminController.loginRequired, UserTaskController.updateUserTask);
router.delete('/deleteUserTask', SuperAdminController.loginRequired, UserTaskController.deleteUserTask);
//router.post('/checkEmail', UserController.checkEmail);
//router.post('/socialLogin', UserController.SocialMediaLoginRegister);
router.post('/loginreq', SuperAdminController.loginRequired); //Auth-Token-Test
router.put('/userTaskStatusUpdate', UserController.loginRequired, UserTaskController.userTaskStatusUpdate)
// router.post('/forgotPassword');
// router.post('/changePassword');
// router.post('/imageUpload');




module.exports = router;
