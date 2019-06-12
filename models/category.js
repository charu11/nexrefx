var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var CategorySchema = Schema({

categoryName        :{type: String, required: true, unique: false},
categoryDescription :{type: String, required: true, unique: false},
subCategories       :{
    subCategoryName :{type: String, required: true, unique: false},
    subCategoryDescription: {type: String, required: true, unique: false}

}

});


module.exports = mongoose.model('Category', CategorySchema);