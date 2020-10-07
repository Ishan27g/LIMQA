const HttpError = require('../models/http-error');
const Tags = require('../models/tag');

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
    try{
        await user.Tags.push(newTag)
        await user.save
    } catch(err){
        console.log(err);
        const error = new HttpError(
          'creating tag failed, please try again.'
        );
        return next(error);
    }
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
        await user.Tags.push(newTag)
        await user.save
    } catch(err){
        console.log(err);
        const error = new HttpError(
          'creating tag failed, please try again.'
        );
        return next(error);
    }
    res.status(201).json({tag: newTag.toObject({ getters : true})});
}

exports.addTagsForUser = addTagsForUser;
exports.addTagsToUserFile = addTagsToUserFile;