'use strict';


var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var Company = require('../models/company');
//var CompanyController = require('./controllers/company');
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


exports.company = function(req, res){
  console.log("###### company ######");
  res.json({status: 'company auth success !'});
};


/* ### Signup / Register ### */
exports.register = function(req, res){
  console.log("###### user register ######");
  Company.findOne({ 'email': req.body.email })
  .exec(function (err, companies) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (companies !== null) {
        console.log("####################### not an null data : company already exist ##########################");
          res.json({ message: 'failed', details: "email already registered!", status: "signup_failed" });
      } else {
        console.log("####################### null data ##########################");
        console.log(companies);
        var company = new Company();
        company.companyName = req.body.companyName;
        company.email = req.body.email;
        company.password =  bcrypt.hashSync(req.body.password, 10);
        company.companyCategory = req.body.companyCategory;
        company.registrationNumber = req.body.registrationNumber;
        company.natureOfBusiness = req.body.natureOfBusiness;
        company.address.address = req.body.address;
        company.address.street = req.body.street;
        company.address.city = req.body.city;
        company.address.country = req.body.country;   
        company.address.zipcode = req.body.zipcode;
        company.officePhone = req.body.officePhone;
        company.contactPerson.firstName = req.body.firstName;
        company.contactPerson.lastName = req.body.lastName;
        company.contactPerson.registration = req.body.registration;
        company.contactPerson.nic = req.body.nic;
        company.contactPerson.passport = req.body.passport;
        company.contactPerson.mobile = req.body.mobile;
        company.contactPerson.emergencyPhone = req.body.emergencyPhone;
        
        //user.businessRegistrationNumber = req.body.BusinessRegistrationNumber;
       // user.isEnabled = req.body.EnableUser;
       // user.isApproved = req.body.ApproveUser;
       // user.isVerified = req.body.VerifydUser;

        company.save(function (err) {
          if (err) {
            console.log('#################### error occured #######################');
            console.log(err);
            res.send(err);
          } else {
           // company.password = undefined;
           console.log(company);
            res.json({ message: 'success', details: "SignIn successfully", content: company });
          }
        });
      }
    }
  });
};

 //### SocialMedia Signup / Social media login ### 
 /*
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

//### SignIn / Login ### 
exports.signIn = function(req, res){
  console.log("###### company signIn #######");
  //res.json({status: 'sign In'});
  Company.findOne({ 'email': req.body.email})
  .exec(function (err, company) {
    if (err) {
      console.log('####### error occured' + err);
      // logger.error(err)
      res.send('error');
    } else {
      if (company !== null) {
        console.log("####################### not an null data : company exist ##########################");
        if(bcrypt.compareSync(req.body.password, company.password)){
          company.password = undefined;
          res.json({ message: 'success', details: "Login successfully", content: company, token: jwt.sign({ email: company.email, companyName: company.companyName, companyCategory:company.companyCategory, _id: company._id}, 'RESTFULAPIs') });
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


// ### Update company Profile  ###  

exports.deleteProfile = function(req, res){
  console.log('###### updating user profile ######');
  Company.findById( mongoose.Types.ObjectId(req.body.companyId))
    .exec(function (err, company) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "company does not exists", status: "company_not_existed" });
      }
      else {
        if (company !== null) {
          var newValues = {
            $set: {
              companyName: req.body.companyName,
              companyCategory: req.body.companyCategory,
              natureOfBusiness: req.body.natureOfBusiness,
              address: req.body.address
            }
          }
          Company.findByIdAndUpdate( mongoose.Types.ObjectId(req.body.companyId), newValues, function (err, result) {
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
                    res.json({ message: 'success', details: "company updated successfully", content: company });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "company does not exists", status: "company_not_exited" });
          }
      }
    });
};

// ### delete company ###

exports.updateProfile = function(req, res){
  console.log('###### updating user profile ######');
  Company.findById( mongoose.Types.ObjectId(req.body.companyId))
    .exec(function (err, company) {
      if (err) {
        console.log('error occured');
        console.log(err)
        res.json({ message: 'failed', details: "company does not exists", status: "company_not_existed" });
      }
      else {
        if (company !== null) {
          
          Company.findByIdAndRemove( mongoose.Types.ObjectId(req.body.companyId), newValues, function (err, result) {
            if (err) {
              console.log(err)
              console.log(result)
              throw err;
            } else {
              Company.findById(req.body.companyId)
                .exec(function (err, company) {
                  if (err) {
                    console.log('error occured');
                    console.log(err)
                  } else {
                    res.json({ message: 'success', details: "company updated successfully", content: company });
                  }
                });
              }
            });
          } else {
            res.json({ message: 'failed', details: "company does not exists", status: "company_not_exited" });
          }
      }
    });
};





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

exports.loginRequired = function(req, res, next){
  console.log("###### login required ######");
  console.log(req.headers)
  if(req.user){
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
