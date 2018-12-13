var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SMSSchema = Schema({
    smsTrackingID: { type: ObjectId, required: true, unique: true },
    senderID: { type: ObjectId, required: true, unique: false },
    senderEmail: { type: String, required: true, unique: false },
    content: { type: String, required: true, unique: false },
    recieverNumber: [{ type: String, required: true, unique: false }],
    type: { type: String, required: true, unique: false, enum:['individual', 'bulk', 'custom'] },
    userPlatform: { type: String, required: true, unique: false, enum:['iOS', 'android', 'web']},
    recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('SMS', SMSSchema);
