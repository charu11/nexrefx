'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var Admin = require('../models/admin');
var AdminController = require('../controllers/admin');
var User = require('../models/user');
var UserController = require('../controllers/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var cryptoHandler = ('../controllers/cryptoHandler');
app.use(cors())
router.use(cors())
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var jsonwebtoken = require('jsonwebtoken');
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


exports.admin = function(req, res){
  console.log("###### user ######");
  res.json({status: 'user auth success !'});
};


/* ### Signup / Register ### */
exports.register = function(req, res){
  console.log("###### admin register ######");
  Admin.findOne({ 'email': req.body.Email })
  .exec(function (err, admins) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (admins !== null) {
        console.log("####################### not an null data : admins already exist ##########################");
          res.json({ message: 'failed', details: "email already registered!", status: "signup_failed" });
      } else {
        console.log("####################### null data ##########################");
        // console.log(users);
        var admin = new Admin();
        admin.firstName = req.body.FirstName;
        admin.lastName = req.body.LastName;
        admin.email = req.body.Email;
        admin.birthday = req.body.Birthday;
        admin.password = bcrypt.hashSync(req.body.Password, 10);
        admin.contactNumber = req.body.ContactNumber;
        admin.nicNumber = req.body.NICNumber;
        admin.address = req.body.Address;
        admin.enableAdmin = req.body.EnableAdmin;
        admin.role = req.body.Role;
        admin.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
            admin.password = undefined;
            res.json({ message: 'success', details: "SignUp successfully", content: admin });
          }
        });
      }
    }
  });
};


/* ### SignIn / Login ### */
exports.signIn = function(req, res){
  console.log("###### user signIn #######");
  //res.json({status: 'sign In'});
  Admin.findOne({ 'email': req.body.Email})
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

//MARK: update user SMS registration Data
exports.updateAUserSMSRegistration = function(req, res){
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

/* ### Update user Profile  ### */
exports.updateProfile = function(req, res){
  console.log('###### updating user profile ######');
  Admin.findById(req.body.UserId)
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
          Admin.findByIdAndUpdate(req.body.UserId, newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              Admin.findById(req.body.UserId)
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
  Admin.findById(req.body.UserId)
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
            Admin.findByIdAndUpdate(req.body.UserId, newValues, function (err, result) {
              if (err) {
                console.log(err)
                throw err;
              } else {
                Admin.findById(req.body.UserId)
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
  Admin.findOne({ 'email': req.body.Email})
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
