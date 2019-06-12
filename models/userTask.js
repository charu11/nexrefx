var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserTaskSchema = Schema({

userId        :{type: Schema.ObjectId, required: true, unique: false},
taskId        :{type: Schema.ObjectId, required: true, unique: false},
clientId      :{type: String, required: true, unique: false},
engageTime    :{type: Date,   required: true, unique: false, default: Date.now},
link          :{type: String, required: true, unique: false},
operation     :{type: String, required: true, unique: false},
status        :{type: String, required: true, unique: false, default: "assigned", enum:['completed', 'started', 'notStarted', 'approved']},
category      :{type: String, required: true, unique: false},
subCategory   :{type: String, required: true, unique: false},
description   :{type: String, required: true, unique: false},
points        :{type: String, required: true, unique: false},
adminCommission:{type: String, required: true, unique: false},
taskType      :{type: String, required: true, unique: false}


});

module.exports = mongoose.model('UserTask', UserTaskSchema);