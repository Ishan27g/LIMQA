// user Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    name: {type : String, required: true},      // social media name
    url: {type : String, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});


module.exports = mongoose.model('Social', socialSchema);