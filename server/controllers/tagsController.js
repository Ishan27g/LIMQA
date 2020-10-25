const HttpError = require('../models/http-error');
const Tags = require('../models/tag');
const User = require('../models/user');
const File = require('../models/file');
const { deleteOne } = require('../models/user');

const addTagsForUser = async (req, res, next) => {
    let userId = req.params.uid
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        console.log(err);
        const error = new HttpError (
                "Something went wrong, could not find user.",
            500
        );
    }
    const newTag = new Tags({
        name : req.body.name,
        color : req.body.color,
        files : [],
        owner : userId
      })
    try {
        await newTag.save();
    } catch (err) {
    console.log(err);
    const error = new HttpError(
        'creating tags failed, please try again.'
    );
    return next(error);
    }
    console.log(user.toObject({ getters : true}))
    try{
        await user.tags.push(newTag)
        await user.save()
    } catch(err){
        console.log(err);
        const error = new HttpError(
          'creating tag failed, please try again.'
        );
        return next(error);
    }
    console.log(user.toObject({ getters : true}).tags)
    res.status(201).json({tag: newTag.toObject({ getters : true})});
}
const addTagsToUserFile = async (req, res, next) => {
    let userId = req.params.uid
    let documentId = req.params.documentId
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        console.log(err);
        const error = new HttpError (
                "Something went wrong, could not find user.",
            500
        );
    }
    //to do
    // get user.tags[] and check if 'name' already exists 
    // if exists, update 'files' only
    // else create a new tag
    const newTag = new Tags({
        name : req.body.name,
        color : req.body.color,
        files : [],
        owner : userId
      })
    try {
        await newTag.save();
        await newTag.files.push(documentId)
        await newTag.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            'creating tags for files failed, please try again.'
        );
        return next(error);
    }
    try{
        await user.tags.push(newTag)
        await user.save()
    } catch(err){
        console.log(err);
        const error = new HttpError(
          'creating tag failed, please try again.'
        );
        return next(error);
    }
    console.log(user.toObject({ getters : true}).tags)
    res.status(201).json({tag: user.toObject({ getters : true}).tags});
}
const getTagsForUser = async (req, res, next) => {
    let userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        console.log(err);
        const error = new HttpError (
                "Something went wrong, could not find user.",
            500
        );
    }
    let existingTags
    try {
        existingTags = await Tags.find({'owner': {$in: userId}});
    } catch (err) {
        console.log(err);
        const error = new HttpError (
                "Something went wrong, could not find user.",
            500
        );
    }
    res.status(201).json(existingTags);
}
const getAllTagsForAllUsers = async (req, res, next) => {
    let allExistingTags
    try {
        allExistingTags = await Tags.find();
    } catch (err) {
        console.log(err);
        const error = new HttpError (
                "Something went wrong, could not find user.",
            500
        );
    }
    res.status(201).json(allExistingTags);
}


const deleteTag = async (req, res, next) => {
    var tagID = req.params.tagId;
    try {
        await Tags.findOneAndRemove(
            { _id: tagID}, 
            { new: true }
        )

        await File.updateMany(
          {"tags" : tagID},
          { "$pull": { "tags": tagID } }
        )

        await User.updateOne(
            { "tags": tagID },
            { "$pull": { "tags": tagID } }
        )
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Delete tag failed.",
            500
        ); 
        return next(error);
    }

    res.json({succeed: true});
}

exports.addTagsForUser = addTagsForUser;
exports.addTagsToUserFile = addTagsToUserFile;
exports.getTagsForUser = getTagsForUser;
exports.getAllTagsForAllUsers = getAllTagsForAllUsers;
exports.deleteTag = deleteTag;
