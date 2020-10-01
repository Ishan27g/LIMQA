const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    email: {type : String, required: false},
    profilePhoto: {type : String, required: false},
    coverImages: [{type : String, required: false}],
    bgImage: {type : String, required: false}
});

photoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Photos'/* name of the model*/, photoSchema);