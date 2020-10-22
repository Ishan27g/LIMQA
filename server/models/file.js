// user Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {type : String, required: true},              // file name
    description: {type : String, required: true},   
    path: {type : String, required: true}, 
    owner:  {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},     
    dateCreated: {type : Date, default: Date.now},
    dateModified: {type : Date, default: Date.now},
    highlighted: {type: Boolean, required: true},
    achivement: {type: Boolean, required: true},
    institution: {type : String},
    dateAchieved: {type : Date},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});


module.exports = mongoose.model('File', fileSchema);