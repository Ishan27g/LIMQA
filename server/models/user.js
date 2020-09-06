const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unque: true},
    files: [{type : String, required: true}],
    password: { type : String, required: true, minlength: 6},
    social : { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User'/* name of the model*/, userSchema);