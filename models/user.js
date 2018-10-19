var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var UserSchema = Schema({
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    birthday: { type: String, required: true, unique: false, default:'none'},
    password: { type: String, required: true, unique: false },
    contactNumber: { type: String, required: true, unique: false, default: 'none' },
    address: {
      address: { type: String, required: true, unique: false },
      zipcode: { type: String, required: true, unique: false },
      city: { type: String, required: true, unique: false },
      state: { type: String, required: false, unique: false },
      country: { type: String, required: true, unique: false }
    },
    enableUser: { type: Boolean, required: true, unique: false, default: true},
    socialLoginId:{ type: String, required: false, unique: true },
    userPlatform: { type: String, required: true, unique: false, enum:['iOS', 'android', 'web']},
    userType: { type: String, required: true, unique: false, default: 'standard', enum:['standard', 'facebook', 'google'] },
    userProfilePic:{ type: String, required: false, unique: false, default: 'none' },
    recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
