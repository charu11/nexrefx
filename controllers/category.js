'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var Category = require('../models/category');
var CategoryController = require('../controllers/category');
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


exports.category = function(req, res){
  console.log("###### category_details ######");
  res.json({status: 'category_details auth success !'});
};


/* ### add category ### */
exports.categoryDetails = function(req, res){
  console.log("###### add category ######");
  Category.findOne({ 'categoryName': req.body.categoryName })
  .exec(function (err, categories) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (categories !== null) {
        console.log("####################### not an null data : category already exist ##########################");
          res.json({ message: 'failed', details: "category already added!", status: "category adding failed" });
      } else {
        console.log("####################### null data ##########################");
        console.log(categories);
        var category = new Category();
        category.categoryName = req.body.categoryName;
        category.categoryDescription = req.body.categoryDescription;
        category.subCategories.subCategoryName = req.body.subCategoryName;
        category.subCategories.subCategoryDescription = req.body.subCategoryDescription;
    
        
        //user.businessRegistrationNumber = req.body.BusinessRegistrationNumber;
       // user.isEnabled = req.body.EnableUser;
       // user.isApproved = req.body.ApproveUser;
       // user.isVerified = req.body.VerifydUser;

        category.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
           // company.password = undefined;
           console.log(category);
            res.json({ message: 'success', details: "category added successfully", content: category });
          }
        });
      }
    }
  });
};

// ### Update categories  ###  

exports.updateCategory = function(req, res){
  console.log('###### updating categories ######');
  Category.findById(req.body.categoryId)
    .exec(function (err, category) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "category does not exists ", status: "category_not_existed" });
      }
      else {
        if (category !== null) {
          var newValues = {
            $set: {
              categoryName: req.body.categoryName,
              categorDescription: req.body.categoryyDescription,
              subCategoryName: req.body.subCategoryName,
              subCategoryDescripton: req.body.subCategoryDescripton
            }
          }
          Category.findByIdAndUpdate(req.body.categoryId, newValues, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              Category.findById(req.body.categoryId)
                .exec(function (err, category) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "category updated successfully", content: category });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "that category does not exists", status: "category_not_existed" });
          }
      }
    });
};



// ### delete category ###


exports.updateCategory = function(req, res){
  console.log('###### updating categories ######');
  Category.findById(req.body.categoryId)
    .exec(function (err, category) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "category does not exists ", status: "category_not_existed" });
      }
      else {
        if (category !== null) {
       
          Category.findByIdAndRemove(req.body.categoryId, function (err, result) {
            if (err) {
              console.log(err)
              throw err;
            } else {
              Category.findById(req.body.categoryId)
                .exec(function (err, category) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "category deleted successfully", content: category });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "that category does not exists", status: "category_not_existed" });
          }
      }
    });
};








/*
// ### Change company password ### 

exports.updatePassword = function(req, res){
  console.log('###### updating password ######');
  Company.findById(req.body.companyId)
    .exec(function (err, company) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "company does not exists", status: "company_not_exited" });
      }
      else {
        if (company !== null) {
          if (bcrypt.compareSync(req.body.oldPassword, company.password)) {
            var newValues = {
              $set: {
                password: bcrypt.hashSync(req.body.newPassword, 10)
              }
            }
            User.findByIdAndUpdate(req.body.companyId, newValues, function (err, result) {
              if (err) {
                console.log(err)
                throw err;
              } else {
                Company.findById(req.body.companyId)
                  .exec(function (err, company) {
                    if (err) {
                      console.log('error occured');
                      console.log(err)
                    } else {
                      res.json({ message: 'success', details: "user profile updated successfully", content: company });
                    }
                  });
                }
              });
          } else {
            res.json({ message: 'failed', details: "Current password doesn't matched!", status: "authentification_failed" });
          }

          } else {
            res.json({ message: 'failed', details: "company does not exists", status: "company_not_existed" });
          }
      }
    });
};

exports.checkEmail = function(req, res){
  console.log('###### checkingEmail ######');
  Company.findOne({ 'email': req.body.email})
  .exec(function (err, company) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (company !== null) {
        console.log("####################### not an null data : company already exist ##########################");
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
