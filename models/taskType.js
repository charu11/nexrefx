var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var TaskTypeSchema = Schema({

taskTypeTitle      : {type: String, required: true, unique: false},
taskTypeDescription: {type: String, required: true, unique: false}


});

module.exports = mongoose.model('TaskType', TaskTypeSchema);