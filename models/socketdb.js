var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var SocketdbSchema = Schema({

        socketId     : { type: String, required: true, unique: false },
   
        

});

module.exports = mongoose.model('Socketdb', SocketdbSchema);

