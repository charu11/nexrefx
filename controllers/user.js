'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
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


exports.user = function(req, res){
  console.log("###### user ######");
  res.json({status: 'user auth success !'});
};


/* ### Signup / Register ### */
exports.register = function(req, res){
  console.log("###### user register ######");
  User.findOne({ 'email': req.body.Email })
  .exec(function (err, users) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (users !== null) {
        console.log("####################### not an null data : user already exist ##########################");
          res.json({ message: 'failed', details: "email already registered!", status: "signup_failed" });
      } else {
        console.log("####################### null data ##########################");
        console.log(users);
        var user = new User();
        user.firstName = req.body.FirstName;
        user.lastName = req.body.LastName;
        user.email = req.body.Email;
        user.birthday = req.body.Birthday;
        user.password = bcrypt.hashSync(req.body.Password, 10);
        user.contactNumber = req.body.ContactNumber;
        //user.address = req.body.Address;
        user.userPlatform = req.body.UserPlatform;
        user.address.address = req.body.Address;
        user.address.zipcode = req.body.Zipcode;
        user.address.city = req.body.City;
        user.address.state = req.body.State;
        user.address.country = req.body.Country;
        user.userType = req.body.UserType;
        user.businessRegistrationName = req.body.BusinessRegistrationName;
        user.businessRegistrationNumber = req.body.BusinessRegistrationNumber;
        user.isEnabled = req.body.EnableUser;
        user.isApproved = req.body.ApproveUser;
        user.isVerified = req.body.VerifydUser;

        user.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
            user.password = undefined;
            res.json({ message: 'success', details: "SignIn successfully", content: user });
          }
        });
      }
    }
  });
};

/* ### SocialMedia Signup / Social media login ### */
exports.SocialMediaLoginRegister = function(req, res){
  console.log('writing new user');
  console.log(req.body);

  var user = new User();
  var socialLogin = mongoose.Types.ObjectId();

  user.email = req.body.Email;
  user.userType = req.body.UserType;
  user.socialLoginId = req.body.SocialLoginId;
  user.userProfilePic = req.body.UserProfilePic;

  User.findOne({ 'email': req.body.Email })
    .exec(function (err, users) {
      if (err) {
        console.log('error occured');
        res.send('error');
      } else {
        if (users !== null) {
          //social media registed email registered already
          console.log("####################### not an null data : user already exist : login in action performing ##########################");
          // console.log(users);
          if (users.socialLoginId == req.body.SocialLoginId) {
            console.log("=========> login successful : pass key matched !");
            users.password = undefined;
            res.json({
              message: 'success',
              details: "login successful",
              status: "login_success",
              content: users
            });
          } else {
            console.log("=========> wrong access key");
            res.json({ message: 'failed', details: "login failed on wrong access key", status: "login_failed" });
          }

        } else {
          console.log("####################### null data ##########################");
          // console.log(users);
          user.password = socialLogin;
          user.fisrtName = req.body.firstName;
          user.lastName = req.body.lastName
          user.contactNumber = 'none';
          user.isEnableUser = true;
          user.birthday[0] = 'none';
          //user.address = 'none';
          user.userPlatform = req.body.UserPlatform;

          user.save(function (err) {
            if (err) {
              console.log('#################### error occured #######################');
              console.log(err);
              res.send(err);
            } else {
              console.log('==============> Social User added successfully !');
              sendEmail(req.body.Email, req.body.Name);
              User.findOne({ 'email': req.body.Email })
                .exec(function (err, user) {
                  if (err) {
                    console.log('error occured');
                    res.send('error');
                  } else {
                    res.json({ message: 'success', details: "Registed successfully", content: user });
                  }
                });
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
