'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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


var isConnected = false;
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
  if (!isConnected) {
    session.connect();    //reconnect again
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
        //res.json({status: 'OTP sent successfully !', response : sms});
        session.deliver_sm_resp({
            sequence_number: pdu.sequence_number
        });
    }
});


function sendSMS(from, to, text){
  session.submit_sm({
      source_addr:      from,
      destination_addr: to,
      short_message:    text
  }, function(pdu) {
      if (pdu.command_status == 0) {
          // Message successfully sent
          console.log(pdu.message_id);
          console.log(pdu);
          //res.json({status: 'OTP success !', response : pdu});
      } else {
        console.log(pdu);
        //res.json({status: 'OTP could not be sent !', response : pdu});
      }
  });
};

exports.otp = function(req, res){
  console.log("###### OTP ######");
  sendSMS("0115936540","0711358399","Test OTP on GET");
  res.json({status: 'OTP test on 0711358399!', response : response});
};


/* ### send sms individual### */
exports.send_otp = function(req, res){
  console.log("###### send OTP ######");
  User.findOne({ 'email': req.body.SenderEmail })
  .exec(function (err, user) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (user !== null) {
        console.log("####################### not an null data : user already exist ##########################");
        var otp = new OTP();
        var ObjectID = require('mongodb').ObjectID;
        var objectId = new ObjectID();
        otp.smsTrackingID = objectId
        otp.senderID = user._id;
        otp.senderEmail = req.body.SenderEmail;
        otp.content = req.body.MessageContent;
        otp.receiverNumber = req.body.ReceiverNumber;
        otp.userPlatform = req.body.UserPlatform;
        otp.type = "otp";
        if(bcrypt.compareSync(req.body.Password, user.password) && (user.isEnabled === true) && (user.isVerified === true) && (user.isApproved === true)){
          console.log("====> OTP authorization passed")
          if (!isConnected) {
            session.connect();    //reconnect again
            sendSMS("0115936540",req.body.ReceiverNumber,req.body.MessageContent);
          } else {
            sendSMS("0115936540",req.body.ReceiverNumber,req.body.MessageContent);
          }

          if (isConnected) {
            otp.save(function (err) {
              if (err) {
                console.log('#################### error occured #######################');
                console.log(err);
                res.send(err);
              } else {
                res.json({status: "success", message: 'OTP sent successfully !', details: "OTP sent successfully !", content: otp });
              }
            });
          } else {
            res.json({status: "failed", message: 'OTP sent failed !', details: "OTP sent failed !", content: otp });
          }
        } else {
          res.json({ message: 'Authorization failed!', details: "invalid password or disabled by admin!", status: "failed" })
        }



      } else {
        console.log("####################### null data : user not exist ##########################");
        //console.log(users);
        res.json({ message: 'user not registered!', details: "user not registered!", status: "failed" });
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
