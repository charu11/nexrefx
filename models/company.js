var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
//var ObjectId = Schema.ObjectId;

var CompanySchema = Schema({
    companyName       : { type: String, required: true, unique: true },
    email             :{type:String, required:true, unique:true},
    password          :{type:String, required:true, unique:true},
    companyCategory   : { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: false },
    natureOfBusiness  : { type: String, required: true, unique: false },
    //productASIN: { type: String, required: true, unique: false },
   //productSellerSKU: { type: String, required: true, unique: false },
    address: {
      address: { type: String, required: true, unique: false },
      street : { type: String, required: true, unique: false },
      city   : { type: String, required: true, unique: false },
      country: { type: String, required: true, unique: false },
      zipcode: { type: String, required: true, unique: false }
    },
   
    officePhone :{type:Number, reqiured:true, unique: true },
    contactPerson   :{
      firstName     :{type: String, required: true, unique: false},
      lastName      :{type: String, required: true, unique: false},
      registration  :{type: String, required: true, unique: false},
      nic           :{type: String, required: false, unique: true},
      passport      :{type: String, required: true, unique: true},
      mobile        :{type: Number, required: true, unique: true},
      emergencyPhone:{type: Number, required: true, unique: true}
    }
});

module.exports = mongoose.model('Company', CompanySchema);
