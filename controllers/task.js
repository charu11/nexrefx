'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var Task = require('../models/task');
var TaskController = require('../controllers/task');
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


exports.task = function(req, res){
  console.log("###### user ######");
  res.json({status: 'task auth success !'});
};


/* ### add task ### */
exports.addTask = function(req, res){
  console.log("###### adding the task ######");
  Task.findOne({ 'client_name': req.body.clientName })
  .exec(function (err, tasks) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (tasks !== null) {
        console.log("####################### not an null data : task already exist ##########################");
          res.json({ message: 'failed', details: "task already exists", status: "add task failed" });
      } else {
        console.log("####################### null data ##########################");
        //console.log(task);
        var task = new Task();
        task.clientName = req.body.clientName;
        task.clientId = req.body.clientId;
        task.category = req.body.category; 
        task.subCategory = req.body.subCategory;
        task.description = req.body.description;
        task.userCount.expected = req.body.expected;
        task.userCount.engaged = req.body.engaged;
        task.taskType = req.body.taskType;
        task.points = req.body.points;
        task.adminCommission = req.body.adminCommission;
        task.engagingTime = req.body.engagingTime;
        task.refLink = req.body.refLink;
        task.operation = req.body.operation;
   
      
        task.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
          
            res.json({ message: 'success', details: "task added successfully", content: task });
            console.log(task);
          }
        });
      }
    }
  });
};
/*
//### SocialMedia Signup / Social media login ### 
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
*/

// ### SignIn / Login ### 
/*exports.signIn = function(req, res){
  console.log("###### user signIn #######");
  //res.json({status: 'sign In'});
  User.findOne({ 'email': req.body.email})
  .exec(function (err, user) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (user !== null) {
        console.log("####################### not an null data : user already exist ##########################");
        if(bcrypt.compareSync(req.body.password, user.password)){
          user.password = undefined;
          res.json({ message: 'success', details: "Login successfully", content: user, token: jwt.sign({ email: user.email, firstName: user.firstName,lastName:user.lastName, _id: user._id}, 'RESTFULAPIs') });
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
*/

// ### Update the task ###  
exports.updateTask = function(req, res){
  console.log('###### updating the task ######');
  Task.findById(req.body.taskId)
    .exec(function (err, task) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "task does not exists", status: "user_not_existed" });
      }
      else {
        if (task !== null) {
          var newValues = {
            $set: {
              
              category: req.body.category,
              subCategory: req.body.subCategory,
              description: req.body.description,
              taskType: req.body.taskType
                          }
          }
          Task.findByIdAndUpdate(req.body.taskId, newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              Task.findById(req.body.taskId)
                .exec(function (err, task) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "task updated successfully", content: task });
                    console.log(task);                  
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "task does not exists", status: "task_does_not_exist" });
          }
      }
    });
};

// ### delete task ###

exports.updateTask = function(req, res){
  console.log('###### updating the task ######');
  Task.findById(req.body.taskId)
    .exec(function (err, task) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "task does not exists", status: "user_not_existed" });
      }
      else {
        if (task !== null) {
          
          Task.findByIdAndURemove(req.body.taskId, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              Task.findById(req.body.taskId)
                .exec(function (err, task) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "task deleted successfully", content: task });
                    console.log(task);                  
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "task does not exists", status: "task_does_not_exist" });
          }
      }
    });
};




/*

// ### Change user password ### 

exports.updatePassword = function(req, res){
  console.log('###### updating password ######');
  User.findById(req.body.userId)
    .exec(function (err, user) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "User does not exists", status: "user_not_exited" });
      }
      else {
        if (user !== null) {
          if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
            var newValues = {
              $set: {
                password: bcrypt.hashSync(req.body.newPassword, 10)
              }
            }
            User.findByIdAndUpdate(req.body.userId, newValues, function (err, result) {
              if (err) {
                console.log(err)
                throw err;
              } else {
                User.findById(req.body.userId)
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
  SuperAdmin.findOne({ 'email': req.body.email})
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
*/
// ### check login required ###
exports.loginRequired = function(req, res, next){
  console.log("###### login required ######");
  console.log(req.headers)
  if(req.user){
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
