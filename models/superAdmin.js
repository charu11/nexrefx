var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var SuperAdminSchema = Schema({
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false, unique: false },
    contactNumber: { type: String, required: false, unique: false },
    firstName: { type: String, required: false, unique: false },
    lastName: { type: String, required: false, unique: false },
    nic: { type: String, required: false, unique: false },
    passport: { type: String, required: false, unique: false },
   // enableAdmin: { type: Boolean, required: true, unique: false, default: true },
   // role:{ type: String, required: true, unique: false, default: 'generic', enum: ['super', 'generic'] },
   // recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);
