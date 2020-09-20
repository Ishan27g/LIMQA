// user Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    name: {type : String, required: true},
    url: {type : String, required: true, unique: true},
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});


module.exports = mongoose.model('Social', socialSchema);