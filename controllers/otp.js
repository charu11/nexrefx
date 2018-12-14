'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var User = require('../models/user');
var OTP = require('../models/otp');
var UserController = require('../controllers/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var cryptoHandler = ('../controllers/cryptoHandler');
app.use(cors())
router.use(cors())
var http = require('http');
var https = require("https");
var url = require('url');
var fs = require('fs');
var path = require('path');
var jsonwebtoken = require('jsonwebtoken');
var request=require('request');
var smsGateway = require('sms-gateway-nodejs')('NEXGEN', 'Nexgen@1')

//var User = mongoose.model('User');

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


exports.otp = function(req, res){
  console.log("###### user ######");
  smsGateway.device.listOfDevices(2)
  .then((response) => {
  // do something with respons
  res.json({status: 'user auth success !', response : response});
})
.catch((error) => {
  // handle error
})

};


/* ### send sms individual### */
exports.send_otp = function(req, res){
  console.log("###### send SMS ######");
  User.findOne({ 'email': req.body.SenderEmail })
  .exec(function (err, users) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (users !== null) {
        console.log("####################### not an null data : user already exist ##########################");
        var otp = new OTP();
        var ObjectID = require('mongodb').ObjectID;
        var objectId = new ObjectID();
        sms.smsTrackingID = objectId
        sms.senderID = users._id;
        sms.senderEmail = req.body.SenderEmail;
        sms.content = req.body.MessageContent;
        sms.recieverNumber = req.body.RecieverNumber;
        sms.userPlatform = req.body.UserPlatform;
        sms.type = "individual";


        var smsURLString = "http://119.235.5.234:5019/Sms.svc/SendSms?phoneNumber="+req.body.RecieverNumber+"&smsMessage="+req.body.MessageContent+"&companyId=NEXGEN2&pword=NEXGEN123";

        const options = {
            //hostname: 'www.google.com',
            //port: 4050,
            //path: '/upload',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Length': Buffer.byteLength(postData)
            }
          };

        request.get(smsURLString,options,function(err,response,body){
          if(err){
            res.send(err);
          } ////TODO: handle err
          console.log(JSON.parse(body));
          if(JSON.parse(body).Status === '200' ){
            sms.save(function (err) {
              if (err) {
                console.log('#################### error occured #######################');
                console.log(err);
                res.send(err);
              } else {
                res.json({ message: 'success', details: "sms sent successfully", content: sms });
              }
            });
          } else {
            res.json({ message: 'failed', details: "sms sent failed"});
          }
        });
      } else {
        console.log("####################### null data : user not exist ##########################");
        //console.log(users);
        res.json({ message: 'failed', details: "email not registered!", status: "signup_failed" });

      }

    }
  });
};

/* ### ~ send bulk sms ~ ### */
exports.send_bulk = function(req, res){
  console.log("###### send SMS ######");
  User.findOne({ 'email': req.body.SenderEmail })
  .exec(function (err, users) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (users !== null) {
        console.log("####################### not an null data : user already exist ##########################");
        var sms = new SMS();
        var ObjectID = require('mongodb').ObjectID;
        var objectId = new ObjectID();
        sms.smsTrackingID = objectId
        sms.senderID = users._id;
        sms.senderEmail = req.body.SenderEmail;
        sms.content = req.body.MessageContent;
        sms.recieverNumber = req.body.RecieverNumber;
        sms.userPlatform = req.body.UserPlatform;
        sms.type = "bulk";

        var smsURLString = "http://119.235.1.63:4050/Sms.svc/SendSms?phoneNumber="+req.body.RecieverNumber+"&smsMessage="+req.body.MessageContent+"&companyId=DROPME&pword=DROPME321";

        const options = {
            //hostname: 'www.google.com',
            //port: 4050,
            //path: '/upload',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Length': Buffer.byteLength(postData)
            }
          };

        request.get(smsURLString,options,function(err,response,body){
          if(err){
            res.send(err);
          } ////TODO: handle err
          console.log(JSON.parse(body));
          if(JSON.parse(body).Status === '200' ){
            sms.save(function (err) {
              if (err) {
                console.log('#################### error occured #######################');
                console.log(err);
                res.send(err);
              } else {
                res.json({ message: 'success', details: "sms sent successfully", content: sms });
              }
            });
          } else {
            res.json({ message: 'failed', details: "sms sent failed"});
          }
        });
      } else {
        console.log("####################### null data : user not exist ##########################");
        //console.log(users);
        res.json({ message: 'failed', details: "email not registered!", status: "signup_failed" });

      }

    }
  });
};


/* ### SignIn / Login ### */
exports.signIn = function(req, res){
  console.log("###### user signIn #######");
  //res.json({status: 'sign In'});
  User.findOne({ 'email': req.body.Email})
  .exec(function (err, user) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (user !== null) {
        console.log("####################### not an null data : user already exist ##########################");
        if(bcrypt.compareSync(req.body.Password, user.password)){
          user.password = undefined;
          res.json({ message: 'success', details: "Login successfully", content: user, token: jwt.sign({ email: user.email, firstName: user.firstName, lastName:user.lastName, _id: user._id}, 'RESTFULAPIs') });
        } else{
          res.json({ message: 'failed', details: "Invalid password!", status: "signin_failed" });
        }
      } else {
        console.log("####################### null data ##########################");
        res.json({ message: 'failed', details: "email not registered!", status: "signin_failed" });
      }
    }
  });
};

/* ### Update user Profile  ### */
exports.updateProfile = function(req, res){
  console.log('###### updating user profile ######');
  User.findById(req.body.UserId)
    .exec(function (err, user) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "User does not exists", status: "user_not_exited" });
      }
      else {
        if (user !== null) {
          var newValues = {
            $set: {
              birthDay: req.body.BirthDay,
              firstName: req.body.FirstName,
              lastName: req.body.LastName,
              contactNumber: req.body.ContactNumber,
              address: req.body.Address
            }
          }
          User.findByIdAndUpdate(req.body.UserId, newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              User.findById(req.body.UserId)
                .exec(function (err, user) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "user profile updated successfully", content: user });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "User does not exists", status: "user_not_exited" });
          }
      }
    });
};


/* ### Change user password ### */
exports.updatePassword = function(req, res){
  console.log('###### updating password ######');
  User.findById(req.body.UserId)
    .exec(function (err, user) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "User does not exists", status: "user_not_exited" });
      }
      else {
        if (user !== null) {
          if (bcrypt.compareSync(req.body.OldPassword, user.password)) {
            var newValues = {
              $set: {
                password: bcrypt.hashSync(req.body.NewPassword, 10)
              }
            }
            User.findByIdAndUpdate(req.body.UserId, newValues, function (err, result) {
              if (err) {
                console.log(err)
                throw err;
              } else {
                User.findById(req.body.UserId)
                  .exec(function (err, user) {
                    if (err) {
                      console.log('error occured');
                      console.log(err)
                    } else {
                      res.json({ message: 'success', details: "user profile updated successfully", content: user });
                    }
                  });
                }
              });
          } else {
            res.json({ message: 'failed', details: "Current password doesn't matched!", status: "authentification_failed" });
          }

          } else {
            res.json({ message: 'failed', details: "User does not exists", status: "user_not_exited" });
          }
      }
    });
};

exports.checkEmail = function(req, res){
  console.log('###### checkingEmail ######');
  User.findOne({ 'email': req.body.Email})
  .exec(function (err, user) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (user !== null) {
        console.log("####################### not an null data : user already exist ##########################");
          res.json({ message: 'success', details: "Email already registed" });
        } else{
          res.json({ message: 'failed', details: "Email not registed"});
        }
      }
  });
};

exports.loginRequired = function(req, res, next){
  console.log("###### login required ######");
  console.log(req.headers)
  if(req.user){
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};