var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var AdminSocketdbSchema = Schema({

    socketId     : { type: String, required: true, unique: false },
    userTaskName : {type: String, required: true, unique: false},
   



});

module.exports = mongoose.model('adminSocketdb', AdminSocketdbSchema);

