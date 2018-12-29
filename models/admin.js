var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: false },
    birthday: { type: String, required: true, unique: false },
    password: { type: String, required: true, unique: false },
    contactNumber: { type: String, required: true, unique: false },
    nicNumber: { type: String, required: true, unique: false },
    address: { type: String, required: true, unique: false },
    enableAdmin: { type: Boolean, required: true, unique: false, default: false },
    role:{ type: String, required: true, unique: false, default: 'generic', enum: ['super', 'generic'] },
    recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('Admin', AdminSchema);
