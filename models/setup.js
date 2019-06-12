var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SetupSchema = Schema({
    credentialShipStationUrl: { type: String, required: true, unique: false },
    credentialShipStationUsername: { type: String, required: true, unique: false },
    credentialShipStationPassword: { type: String, required: true, unique: false },
    credentialShipStationAPIKey: { type: String, required: true, unique: false },

    credentialMailChimpUrl: { type: String, required: true, unique: false },
    credentialMailChimpUsername: { type: String, required: true, unique: false },
    credentialMailChimpPassword: { type: String, required: true, unique: false },
    credentialMailChimpAPIKey: { type: String, required: true, unique: false },

    credentialPythonAnywhereUrl: { type: String, required: true, unique: false },
    credentialPythonAnywhereUsername: { type: String, required: true, unique: false },
    credentialPythonAnywherePassword: { type: String, required: true, unique: false },
    credentialPythonAnywhereAPIKey: { type: String, required: true, unique: false },

    credentialAmazonMWSAPIUrl: { type: String, required: true, unique: false },
    credentialAmazonMWSAPIUsername: { type: String, required: true, unique: false },
    credentialAmazonMWSAPIPassword: { type: String, required: true, unique: false },
    credentialAmazonMWSAPIAPIKey: { type: String, required: true, unique: false },

    recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('Setup', SetupSchema);
