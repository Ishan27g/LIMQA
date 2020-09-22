// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  Photos = require('../models/photos');
const  User = require('../models/user');

const getProfilePhoto = async (req, res, next) => {
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ email: req.user.email})
    } catch (err) {
        const error = new HttpError(
        'Photos not found.',
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        console.log("profile photo is saved at " + existingPhoto.profilePhoto)
        res.status(201).json({profilePhoto:existingPhoto.profilePhoto});
    }   
    else{
        const error = new HttpError(
            'User not found.',
            500
            );
        return next(error);
    }
  };
  
const addProfilePhoto = async (req, res, next) =>{
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ email: req.user.email})
    } catch (err) {
        const error = new HttpError(
            'Photos not found.',
             500
        );
        return next(error);
    }
    if(existingPhoto) {
        const update = {profilePhoto : req.file.path}
        await existingPhoto.updateOne(update);
        res.status(201).json({profilePhoto:true});
    }else{
        const error = new HttpError(
            'profile photo not uploaded.',
            500
            );
        return next(error);
    }
}

exports.getProfilePhoto = getProfilePhoto;
exports.addProfilePhoto = addProfilePhoto;