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
app.use(cors());
router.use(cors());
var http = require('http');
var https = require("https");
var url = require('url');
var fs = require('fs');
var path = require('path');
var jsonwebtoken = require('jsonwebtoken');
var request=require('request');
const smpp = require('smpp');
const session = new smpp.Session({host: '119.235.5.234', port: 5019});

//var User = mongoose.model('User');




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


function sendSMS(from, to, text){
   from += `+${from}`
// this is very important so make sure you have included + sign before ISD code to send sms

  to += `+${to}`

  session.submit_sm({
      source_addr:      from,
      destination_addr: to,
      short_message:    text
  }, function(pdu) {
      if (pdu.command_status == 0) {
          // Message successfully sent
          console.log(pdu.message_id);
      }
  });
};

exports.otp = function(req, res){
  console.log("###### OTP ######");
  // do something with respons
  // sendSMS("94115936540","94711358399","TestOTP");
  session.on('connect', () => {
    isConnected = true;
    console.log("session started")
    session.bind_transceiver({
        system_id: 'NEXGEN',
        password: 'Nexgen@1',
        interface_version: 1,
        system_type: '+94000000000',
        address_range: '+94999999999',
        addr_ton: 1,
        addr_npi: 1,
    }, (pdu) => {
      if (pdu.command_status == 0) {
          console.log('Successfully bound')
      }
      });
    });

    session.submit_sm({
        source_addr:      "+94115936540",
        destination_addr: "+94711358399",
        short_message:    "Test OTP"
    }, function(pdu) {
        if (pdu.command_status == 0) {
            // Message successfully sent
            console.log(pdu.message_id);
        }
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

  // res.json({status: 'user auth success !', response : response});


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
        otp.smsTrackingID = objectId
        otp.senderID = users._id;
        otp.senderEmail = req.body.SenderEmail;
        otp.content = req.body.MessageContent;
        otp.recieverNumber = req.body.RecieverNumber;
        otp.userPlatform = req.body.UserPlatform;
        otp.type = "individual";


        var smsURLString = "http://119.235.5.234:5019/Sms.svc/SendSms?phoneNumber="+req.body.RecieverNumber+"&smsMessage="+req.body.MessageContent+"&companyId=NEXGEN&pword=Nexgen@1";

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
  //console.log("###### login required ######");
  //console.log(req.headers)
  if(req.user){
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
