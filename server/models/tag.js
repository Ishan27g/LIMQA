// user Schema
const mongoose = require('mongoose');
const HttpError = require('./http-error');
const { nextTick } = require('process');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {type : String, required: true},              // tag name
    color: {type : String, required: true},
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}],
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},     
});

module.exports = mongoose.model('Tag', tagSchema);