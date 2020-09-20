const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unque: true},
    password: { type : String, required: true, minlength: 6}, 
    social : { type: String, required: true},
    documents: [{type : String, required: true}],
    bioinfo: { type: String, required: true}
});

const photoSchema = new Schema({
    name: {type : String, required: true},
    profilePhoto: {type : String, required: true},
    coverImages: {type : String, required: true}
});


userSchema.plugin(uniqueValidator);
photoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User'/* name of the model*/, userSchema);
module.exports = mongoose.model('Photos'/* name of the model*/, photoSchema);