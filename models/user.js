var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    //userId       : {type: String, required: true, unique: false },
    firstName    : { type: String, required: true, unique: false },
    lastName     : { type: String, required: true, unique: false },
    email        : { type: String, required: true, unique: false },
    password     : { type: String, required: true, unique: false },
    birthday     : {type: Date, required: true, unique: false },
    contactNumber: {type: Number, required: true, unique: false },
    address      : {
      address : { type: String, required: true, unique: false },
      zipcode : { type: String, required: true, unique: false },
      city    : { type: String, required: true, unique: false },
      state   : { type: String, required: false, unique: false },
      country : { type: String, required: true, unique: false }
    },
    //profileImage : {type: String, required: true, unique: false}
    //numberOfProductOrders: { type: Number, required: true, unique: false, default: 0 },
    //numberOfFreeItems: { type: Number, required: true, unique: false, default: 0 },
    //numberOfPromos: { type: Number, required: true, unique: false, default: 0 },
    //recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
    
});

module.exports = mongoose.model('User', UserSchema);

