'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var TaskType = require('../models/taskType');
var TaskTypeController = require('../controllers/taskType');
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


exports.taskType = function(req, res){
  console.log("###### taskType_details ######");
  res.json({status: 'taskType_details auth success !'});
};


/* ### add task type ### */
exports.addTaskType = function(req, res){
  console.log("###### add category ######");
  TaskType.findOne({ 'taskTypeTitle': req.body.taskTypeTitle})
  .exec(function (err, taskTypes) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (taskTypes !== null) {
        console.log("####################### not an null data : task_title is already exist ##########################");
          res.json({ message: 'failed', details: "task title already added!", status: "category adding failed" });
      } else {
        console.log("####################### null data ##########################");
        var taskType = new TaskType();
        taskType.taskTypeTitle = req.body.taskTypeTitle;
        taskType.taskTypeDescription = req.body.taskTypeDescription;
 
        //user.businessRegistrationNumber = req.body.BusinessRegistrationNumber;
       // user.isEnabled = req.body.EnableUser;
       // user.isApproved = req.body.ApproveUser;
       // user.isVerified = req.body.VerifydUser;

       taskType.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
           // company.password = undefined;
           console.log(taskType);
            res.json({ message: 'success', details: "taskType added successfully", content: taskType });
          }
        });
      }
    }
  });
};

// ### update task type  ###  

exports.updateTaskType = function(req, res){
  console.log('###### updating categories ######');
  TaskType.findById(req.body.taskTypeId)
    .exec(function (err, taskType) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "task type does not exists ", status: "taskType_not_existed............." });
      }
      else {
        if (taskType !== null) {
          var newValues = {
            $set: {
              taskTypeTitle: req.body.taskTypeTitle,
              taskTypeDescription: req.body.taskTypeDescription,
            
            }
          }
          TaskType.findByIdAndUpdate(req.body.taskTypeId, newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              TaskType.findById(req.body.taskTypeId)
                .exec(function (err, taskType) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "task type updated successfully", content: taskType });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "that task type does not exists", status: "taskType_not_existed!" });
          }
      }
    });
};

// ### delete task type ###

exports.updateTaskType = function(req, res){
  console.log('###### updating categories ######');
  TaskType.findById(req.body.taskTypeId)
    .exec(function (err, taskType) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "category does not exists ", status: "category_not_existed" });
      }
      else {
        if (taskType !== null) {
          
          TaskType.findByIdAndRemove(req.body.taskTypeId, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              TaskType.findById(req.body.taskTypeId)
                .exec(function (err, taskType) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "taskType updated successfully", content: taskType });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "that taskType does not exists", status: "taskType_not_existed...................................................." });
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
