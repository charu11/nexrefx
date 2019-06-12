var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    //userId       : {type: String, required: true, unique: false },
    clientName     : {type: String, required: true, unique: false},
    clientId       : {type: String, required: true, unique: false},
    category       : {type: String, required: true, unique: false},
    subCategory    : {type: String, required: true, unique: false},
    description    : {type: String, required: true, unique: false},
    userCount      : {
        expected   : {type: String, required: true, unique: false},
        engaged    : {type: String, required: true, unique: false}
    },
    taskType       : {type: String, required: true, unique: false},
    points         : {type: String, required: true, unique: false},
    adminCommission: {type: String, required: true, unique: false},
    engagingTime   : {type: String, required: true, unique: false},
    refLink        : {type: String, required: true, unique: false},
    operation      : {type: String, required: true, unique: false}
});
module.exports = mongoose.model('Task', TaskSchema);

