'use strict';


var express = require('express');
var http = require('http');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var SuperAdmin = require('../models/superAdmin');
//var SuperAdminController = require('./superAdmin');
var UserTask = require('../models/userTask');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var cryptoHandler = ('../controllers/cryptoHandler');
app.use(cors())
router.use(cors())
//var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var jsonwebtoken = require('jsonwebtoken');
//var User = mongoose.model('User');
var server = require('../app.js');
var portSelected = require('../app.js');

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


exports.superAdmin = function(req, res){
  console.log("###### superAdmin ######");
  res.json({status: 'superAdmin auth success !'});
};


// ### Signup / Register ### 
exports.register = function(req, res){
  console.log("###### superAdmin register ######");
  SuperAdmin.findOne({ 'email': req.body.email })
  .exec(function (err, superAdmin) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (superAdmin !== null) {
        console.log("####################### not an null data : superAdmins already exist ##########################");
          res.json({ message: 'failed', details: "email already registered!", status: "signup_failed" });
      } else {
        console.log("####################### null data ##########################");
       
        var superAdmin = new SuperAdmin();
        superAdmin.email = req.body.email;
        superAdmin.password = bcrypt.hashSync(req.body.password, 10);
        superAdmin.contactNumber = req.body.contactNumber;
        superAdmin.firstName = req.body.firstName; 
        superAdmin.lastName = req.body.lastName;
        superAdmin.nic = req.body.nic;
        superAdmin.passport = req.body.passport;
        //admin.role = req.body.Role;

        superAdmin.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
            superAdmin.password = undefined;
            res.json({ message: 'success', details: "SignUp successfully", content: superAdmin });
            console.log(superAdmin);
          }
        });
      }
    }
  });
};


//### SignIn / Login ### 
exports.signIn = function(req, res){
  console.log("###### superAdmin signIn #######");
  //res.json({status: 'sign In'});
  SuperAdmin.findOne({ 'email': req.body.email})
  .exec(function (err, superAdmin) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (superAdmin !== null) {
        console.log("####################### not an null data : super_admin already exist ##########################");
        if(bcrypt.compareSync(req.body.password, superAdmin.password)){
          superAdmin.password = undefined;
          res.json({ message: 'success', details: "Login successfully", content: superAdmin, token: jwt.sign({ email: superAdmin.email, firstName: superAdmin.firstName, lastName:superAdmin.lastName, _id: superAdmin._id}, 'RESTFULAPIs') });
          console.log(superAdmin);
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
/*
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
*/

//### Update superAdmin Profile  ### 

exports.updateProfile = function(req, res){
  console.log('###### updating superAdmin profile ######');
  SuperAdmin.findById(req.body.superAdminId)
    .exec(function (err, superAdmin) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "superAdmin does not exists", status: "superAdmin_not_exited" });
      }
      else {
        if (superAdmin !== null) {
          var newValues = {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              contactNumber: req.body.contactNumber
             
            }
          }
          SuperAdmin.findByIdAndUpdate((req.body.superAdminId), newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              SuperAdmin.findById(req.body.superAdminId)
                .exec(function (err, superAdmin) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "superAdmin profile updated successfully", content: superAdmin });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "superAdmin does not exists", status: "superAdmin_not_existed" });
          }
      }
    });
};


//### Delete superAdmin Profile  ### 

exports.deleteProfile = function(req, res){
  console.log('###### deleting superAdmin profile ######');
  SuperAdmin.findById(req.body.superAdminId)
    .exec(function (err, superAdmin) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "superAdmin does not exists", status: "superAdmin_not_exited" });
      }
      else {
        if (superAdmin !== null) {
        
          SuperAdmin.findByIdAndRemove(req.body.superAdminId, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              SuperAdmin.findById(req.body.superAdminId)
                .exec(function (err, superAdmin) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "superAdmin profile delete successfully", content: superAdmin });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "superAdmin does not exists", status: "superAdmin_not_existed" });
          }
      }
    });
};



// ### Change superAdmin password ### 

exports.updatePassword = function(req, res){
  console.log('###### updating password ######');
  SuperAdmin.findById(req.body.superAdminId)
    .exec(function (err, superAdmin) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "superAdmin does not exists", status: superAdmin });
      }
      else {
        if (superAdmin !== null) {
          if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
            var newValues = {
              $set: {
                password: bcrypt.hashSync(req.body.newPassword, 10)
              }
            }
            SuperAdmin.findByIdAndUpdate(req.body.superAdminId, newValues, function (err, result) {
              if (err) {
                console.log(err)
                throw err;
              } else {
                SuperAdmin.findById(req.body.superAdminId)
                  .exec(function (err, superAdmin) {
                    if (err) {
                      console.log('error occured');
                      console.log(err)
                    } else {
                      res.json({ message: 'success', details: "superAdmin profile updated successfully", content: superAdmin });
                    }
                  });
                }
              });
          } else {
            res.json({ message: 'failed', details: "Current password doesn't matched!", status: "authentification_failed" });
          }

          } else {
            res.json({ message: 'failed', details: "superAdmin does not exist", status: "superAdmin_not_existed" });
          }
      }
    });
};


//####........ update userTask status........####

exports.userTaskStatusUpdate = function(req, res){
  console.log('........................updating userTask status.................');
  
  SuperAdmin.findById(req.body.superAdminId)
  .exec(function(err, superAdmin){
    if(err){
      console.log(err);
    res.json({message: 'failed', details: 'superAdmin not found'});
 
    }else{
      if(superAdmin !== null){

        UserTask.findById(req.body.userTaskId)
        .exec(function(err, userTask){
          if(err){
            console.log(err);
            res.json({message: 'failed', details: 'user task not found'});

          }else{
            
            if(req.body.status == 'started' ){ 
              var newValues = {
                $set:{
                  status: 'started'
                }
              }
            }else{
              if(req.body.status == 'notStarted'){
                var newValues = {
                  $set:{
                    status: 'notStarted'
                  }
                }
              }else{
                if(req.body.status == 'approved'){
                  var newValues = {
                    $set:{
                      status : 'approved'
                    }
                  }
                }else{
                  if(req.body.status == 'completed'){
                    var newValues = {
                      $set: {
                        status: 'completed'
                      } 
            
                    }
                  }else{
                    res.json({message: 'failed', details: 'wrong option'})
                  }
                }
              }
            }
          if(userTask !== null){
            UserTask.findByIdAndUpdate(req.body.userTaskId, newValues, function(err, result){
              if(err){
                res.json({message: 'failed', details: 'user task does not updated'})
                console.log(err);
                console.log('user task does not updated.............');
              }else{
                console.log(result);
                res.json({message: 'success', details: 'user task updated successfully', content: userTask})
              }
            })
          }


          } 
        })
      }else{
        res.json({message:'failed', details: 'super admin is a null. super admin doesnt exist'})
      }
    }
  })
}






exports.checkEmail = function(req, res){
  console.log('###### checkingEmail ######');
  SuperAdmin.findOne({ 'email': req.body.email})
  .exec(function (err, user) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (superAdmin !== null) {
        console.log("####################### not an null data : user already exist ##########################");
          res.json({ message: 'success', details: "Email already registed" });
        } else{
          res.json({ message: 'failed', details: "Email not registed"});
        }
      }
  });
};
// ### login required ### 

exports.loginRequired = function(req, res, next){
  console.log("###### login required ######");
  console.log(req.headers)
  if(req.user){
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

