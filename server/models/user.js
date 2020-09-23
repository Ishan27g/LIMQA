// user Schema
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: { type : String, required: true, minlength: 6}, 
    social: [{ type: Schema.Types.ObjectId, required: true, ref: 'Social'}],
    documents: [{type : String, required: true}],
    bioinfo: { type: String, required: true},
    officeAddress: { type: String, required: false},
    mobile: { type: String, required: false},
    semail: { type: String, required: true, unique: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User'/* name of the model*/, userSchema);