'use strict';


var express = require('express');
var socket = require('socket.io');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var UserTask = require('../models/userTask');
var UserTaskController = require('../controllers/userTask');
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


exports.userTask = function(req, res){
  console.log("###### user_task ######");
  res.json({status: 'user_task auth success !'});
};


/* ### Add user task ### */
exports.addUserTask = function(req, res){
  console.log("###### userTask adding ######");
      
        var userTask = new UserTask();
        userTask.userId = req.body.userId;
        userTask.taskId = req.body.taskId;
        userTask.clientId = req.body.clientId; 
        userTask.engageTime = req.body.engageTime;
        userTask.link = req.body.link;
        userTask.operation = req.body.operation;
        userTask.status = req.body.status;         
        userTask.category = req.body.category;
        userTask.subCategory = req.body.subCategory;
        userTask.description = req.body.description;
        userTask.points = req.body.points;
        userTask.adminCommission = req.body.adminCommission;
        userTask.taskType = req.body.taskType;
       
      
        userTask.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
          
            
            res.json({ message: 'success', details: "user task added successfully", content: userTask });
            console.log(userTask);
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

// ### Edit user task ###  
exports.updateUserTask = function(req, res){
  console.log('###### updating user profile ######');
  UserTask.findById(req.body.userTaskId)
    .exec(function (err, userTask) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "User task does not exists", status: "userTask_not_existed" });
      }
      else {
        if (userTask !== null) {
          var newValues = {
            $set: {
              
              engageTime: req.body.engageTime,
              operation: req.body.operation,
              status: req.body.status,
          
            }
          }
          UserTask.findByIdAndUpdate(req.body.userTaskId, newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              UserTask.findById(req.body.userTaskId)
                .exec(function (err, userTask) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "user profile updated successfully", content: userTask });
                    console.log(userTask);                  
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "User does not exists", status: "user_not_existed" });
          }
      }
    });

   
};

// ### delete user task ###  
exports.deleteUserTask = function(req, res){
  console.log('###### updating user profile ######');
  UserTask.findById(req.body.userTaskId)
    .exec(function (err, userTask) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "User task does not exists", status: "userTask_not_existed" });
      }
      else {
        if (userTask !== null) {
         
          UserTask.findByIdAndRemove(req.body.userTaskId, function (err, result) {
            if (err) {
              console.log(err)
              console.log(result)
              throw err;
            } else {
              UserTask.findById(req.body.userTaskId)
                .exec(function (err, userTask) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "user task deleted successfully", content: userTask });
                    console.log(userTask);                  
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "User does not exists", status: "user_not_existed" });
          }
      }
    });
};

//.....## userTask status update.....###

exports.userTaskStatusUpdate = function(req, res){
  console.log('updating user status');
UserTask.findById(req.body.userTaskId)
  .exec(function(err, userTask){
    if(err){
      console.log('.................error occured..................');
      console.log(err);
      
    } else{
      if(userTask !== null){
      
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
          res.json({message: 'failed', details: 'wrong option'});
        }
      }
        UserTask.findByIdAndUpdate(req.body.userTaskId, newValues, function(err, result){
          if(err){
            console.log(err);
            console.log('error occured');
            
          }else{
           UserTask.findById(req.body.userTaskId)
           .exec(function(err, userTask){
             if(err){
              console.log('error occured'); 
              console.log(err);
               
             }else{
              console.log(result);
              res.json({message: 'success', details: 'user task updated successfully', content: UserTask })
             }
           })
          }
        })
      }else{
        console.log(err);
        res.json({message: 'failed', details: 'user task not found', content: userTask});
      }
    }
  })

  
}







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
  User.findOne({ 'email': req.body.email})
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
exports.loginRequired = function(req, res, next){
  console.log("###### login required ######");
  console.log(req.headers)
  if(req.user){
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
