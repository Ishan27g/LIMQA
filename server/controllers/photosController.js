const fs = require('fs');
const { exec } = require('child_process');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  Photos = require('../models/photos');
const  User = require('../models/user');

const getBgImage = async (req, res, next) => {
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
        var bgImage = existingPhoto.toObject({getters: true})
        res.status(200).json({ bgImage });
        /*read the image using fs and send the image content back in the response
        fs.readFile(bgImage.bgImage, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });*/
    }   
    else{
        const error = new HttpError(
            'User not found.',
            500
            );
        return next(error);
    }
  };

const addBgImage = async (req, res, next) =>{
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
        const update = {bgImage : req.file.path}
        await existingPhoto.updateOne(update);
        res.status(201).json({bgImage:true});
    }else{
        const error = new HttpError(
            'bg Image  not uploaded.',
            500
            );
        return next(error);
    }
}
const getCoverImages = async (req, res, next) => {
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
        var coverImages = existingPhoto.toObject({getters: true})
        res.status(200).json({ coverImages });
        /*
        console.log("Cover image is saved at " + existingPhoto.toObject({getters: true}))
        //console.log("Cover image 0 is saved at " +coverImages.coverImages[0])
        //read the image using fs and send the image content back in the response
        fs.readFile(coverImages.coverImages[0], function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
       
    });
     */
    }   
    else{
        const error = new HttpError(
            'User not found.',
            500
            );
        return next(error);
    }
  };

const addCoverImages = async (req, res, next) =>{
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
        var path = [];
        for (i = 0; i < req.files.length; i++) {
            path.push(req.files[i].path);
            console.log('File : ' + i + req.files[i].path)
        }
        const update = {coverImages : path}
        await existingPhoto.updateOne(update);
        res.status(201).json({coverImages:true});
    }else{
        const error = new HttpError(
            'Cover images not uploaded.',
            500
            );
        return next(error);
    }
}

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
        var coverImages = existingPhoto.toObject({getters: true})
        res.status(200).json({ coverImages });
        /*read the image using fs and send the image content back in the response
        fs.readFile(existingPhoto.profilePhoto, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });*/
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
        /*
            Delete the actual image from uploads/ if it exists,
            
            TO-DO
        */
       
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
exports.getCoverImages = getCoverImages;
exports.addCoverImages = addCoverImages;
exports.getBgImage = getBgImage;
exports.addBgImage = addBgImage;