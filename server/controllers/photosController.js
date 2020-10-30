const fs = require('fs');
const { exec } = require('child_process');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  Photos = require('../models/photos');

const getBgImage = async (req, res, next) => {
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
        'Photos not found for this user' ,
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        var bgImage = existingPhoto.toObject({getters: true})
        bgImage = bgImage.bgImage
        res.status(200).json({ bgImage });
    }
    else{
        const error = new HttpError(
            'User not found.'+req.user.email,
            500
            );
        return next(error);
    }
  };
const delBgImage = async (req, res, next) => {
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
        'Photos not found for this user' ,
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        var bgImage = existingPhoto.toObject({getters: true})
        bgImage = `rm ${bgImage.bgImage}`
        console.log(bgImage)
        exec(bgImage, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
        const update = {bgImage : ""}
        await existingPhoto.updateOne(update);
        res.status(201).json({bgImage:false});
    }
    else{
        const error = new HttpError(
            'User not found.'+req.user.email,
            500
            );
        return next(error);
    }
  };
const addBgImage = async (req, res, next) =>{
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'Photos not found for this user' ,
             500
        );
        return next(error);
    }
    if(existingPhoto) {
        const update = {bgImage : req.body.bgImage}
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
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'Photos not found for this user' ,
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        var coverImages = existingPhoto.toObject({getters: true})
        res.status(200).json({ coverImages });
    }
    else{
        const error = new HttpError(
            'User not found.' ,
            500
            );
        return next(error);
    }
  };

const getCoverImagesById = async (req, res, next) =>{
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'Photos not found for this user' ,
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        const id = req.params.id;
        var coverImages = existingPhoto.toObject({getters: true})
        fs.readFile(coverImages.coverImages[id], function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");
        } else {
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }

        });
    }
    else{
        const error = new HttpError(
            'User not found.' ,
            500
            );
        return next(error);
    }
}

const delCoverImagesById = async (req, res, next) =>{
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'Photos not found for this user' ,
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        const id = req.params.id;
        var coverImages = existingPhoto.toObject({getters: true})
        var path = [];
        for (i = 0; i < coverImages.coverImages.length; i++) {
            if(i != id){
                path.push(coverImages.coverImages[i]);
                console.log('File : ' + i + coverImages.coverImages[i])
            }
        }
        coverImages = coverImages.coverImages[id]
        coverImages = `rm ${coverImages}`
        console.log(coverImages)
        exec(coverImages, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
        console.log(path)

        const update = {coverImages : path, ciModifiedOn: new Date ()}
        await existingPhoto.updateOne(update);
        res.status(201).json({coverImages:false});
    }
    else{
        const error = new HttpError(
            'Photos not found for this user' ,
            500
            );
        return next(error);
    }
}

const addCoverImages = async (req, res, next) =>{
    var limit;
    var path = [];
    for (i = 0; i < req.files.length; i++) {
        path.push(req.files[i].path);
        console.log('File : ' + i + req.files[i].path)
    }
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'Photos not found for this user' ,
             500
        );
        return next(error);
    }
    if(existingPhoto.coverImages[0] === ""){
        limit = path.length;
        existingPhoto.ciCreatedOn = new Date()
    }else{
        existingPhoto.ciModifiedOn = new Date()
        limit = existingPhoto.coverImages.length + path.length;
    }
    
    if(limit > 5) {
        return next(new HttpError("Exceed cover image limits, no more that five."));
    }
    if(existingPhoto.coverImages[0] === ""){
        existingPhoto.coverImages =path;
    }else{ 
        existingPhoto.coverImages = existingPhoto.coverImages.concat(path);
    }
    console.log(existingPhoto.coverImages);
    try {
        await existingPhoto.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            'Cannot save cover images ',
             500
        );
        return next(error);
    }
    res.json({succeed : true});
}

const getProfilePhoto = async (req, res, next) => {
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'User not found' ,
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        var coverImages = existingPhoto.toObject({getters: true})
        fs.readFile(existingPhoto.profilePhoto, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");
        } else {
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });
    }
    else{
        const error = new HttpError(
            'Photos not found.'+req.user.email,
            500
            );
        return next(error);
    }
  };

const addProfilePhoto = async (req, res, next) =>{
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'User not found' ,
             500
        );
        return next(error);
    }
    if(existingPhoto) {
        let update
        if(existingPhoto.profilePhoto == ""){
            update = {profilePhoto : req.file.path, prCreatedOn: new Date()}
        }
        else{
            update = {profilePhoto : req.file.path, prModifiedOn: new Date()}
        }
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
const deleteProfilePhoto = async (req, res, next) =>{
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
            'User not found' ,
             500
        );
        return next(error);
    }
    if(existingPhoto) {
        var path = existingPhoto.toObject({getters: true})
        path = `rm ${path.profilePhoto}`
        console.log(path)

        exec(path, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });

        const update = {profilePhoto : "", prModifiedOn: new Date()}
        await existingPhoto.updateOne(update);
        res.status(201).json({profilePhoto:false});
    }else{
        const error = new HttpError(
            'profile photo not deleted.',
            500
            );
        return next(error);
    }
}

const getProfilePhotoTimeStamp = async (req, res, next) => {
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
        'user not found.',
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        res.status(200).json({userPhotos: existingPhoto.toObject({getters: true})});
    }
    else{
        const error = new HttpError(
            'Photos for this user not found.'+req.user.email,
            500
            );
        return next(error);
    }
  };
  const getCoverImagesTimeStamp = async (req, res, next) => {
    let userId = req.params.uid
    let existingPhoto
    try {
        existingPhoto = await Photos.findOne({ owner: userId})
    } catch (err) {
        const error = new HttpError(
        'user not found.',
        500
        );
        return next(error);
    }
    if(existingPhoto) {
        res.status(200).json({userPhotos: existingPhoto.toObject({getters: true})});
    }
    else{
        const error = new HttpError(
            'Photos for this user not found.'+req.user.email,
            500
            );
        return next(error);
    }
  };


exports.getProfilePhoto = getProfilePhoto;
exports.addProfilePhoto = addProfilePhoto;
exports.deleteProfilePhoto = deleteProfilePhoto;
exports.getCoverImages = getCoverImages;
exports.addCoverImages = addCoverImages;
exports.getBgImage = getBgImage;
exports.addBgImage = addBgImage;
exports.delBgImage = delBgImage;
exports.getCoverImagesById = getCoverImagesById;
exports.delCoverImagesById = delCoverImagesById;

exports.getCoverImagesTimeStamp = getCoverImagesTimeStamp;
exports.getProfilePhotoTimeStamp = getProfilePhotoTimeStamp;

