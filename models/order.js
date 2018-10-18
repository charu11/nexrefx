var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
    userId: { type: String, required: true, unique: false },
    userName: { type: String, required: true, unique: false },
    userEmail: { type: String, required: true, unique: false },
    userContactNumber: { type: String, required: true, unique: false },
    userAddress: { type: String, required: true, unique: false },
    orderType: { type: String, required: true, unique: false, enum:['mug', 'rock', 'tShirt', 'tile'] },
    orderBaseModel: { type: String, required: true, unique: false },
    canvasSize: {
      height: { type: String, required: true, unique: false },
      width: { type: String, required: true, unique: false }
    },
    colorCode: { type: String, required: true, unique: false, default: '#FFFFFF' },
    image: { type: String, required: true, unique: false },
    orderStatus: { type: String, required: true, unique: false, default: 'placed', enum:['placed', 'confirmed', 'onProcess', 'packed_n_ready', 'delivered', 'hold', 'canceled'] },
    recordedTime:  { type: Date, required: true, unique: false, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);
