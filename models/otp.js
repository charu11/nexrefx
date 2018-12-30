var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var OtpSchema = Schema({
    smsTrackingID: { type: ObjectId, required: true, unique: true },
    senderID: { type: ObjectId, required: true, unique: false },
    senderEmail: { type: String, required: true, unique: false },
    content: { type: String, required: true, unique: false },
    receiverNumber: { type: String, required: true, unique: false },
    type: { type: String, required: true, unique: false, enum:['otp', 'bulk', 'custom'] },
    userPlatform: { type: String, required: true, unique: false, enum:['iOS', 'android', 'web', 'API']},
    recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('OTP', OtpSchema);
