// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const normalizeEmail = require('normalize-email');
const validator = require("email-validator");
const  User = require('../models/user');
const Social = require('../models/social');
const File = require('../models/file');
const Tag = require('../models/tag');


const { db, updateOne } = require('../models/user');


const getBioinfo = async (req, res, next) => {
  let userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fail to find user, please try again.",
      500
    );
    return next(error);
  }

  if(!user) {
    return next(new HttpError("Cannot find user for provided userID,"));
  }
  res.json(
    {bioinfo: user.bioinfo}
  );
};

const updateBioinfo  = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { bioinfo } = req.body;

  let userId;
  userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update bioinfo.',
      500
    );
    return next(error);
  }
  if(user) {
    user.bioinfo = bioinfo;
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update bioinfo.',
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const getAcc = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate('social');
  } catch (err) {
    const error = new HttpError(
      'Fetching social links failed, please try again later',
      500
    );
    return next(error);
  }

  if (!user || user.social.length === 0) {
    return next(
      new HttpError('Could not find social links for the provided user id.', 404)
    );
  }

  res.json({
    user: user.toObject({ getters: true })
  });
};

const updateAcc  = async (req, res, next) => {

  let userId;
  userId = req.params.uid;

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
  
  // get the social objects in socials
  let socials = [];
  let names = [];
  let media;
  let ins;
  let linkedin;
  let facebook;
  let github;
  let wechat;
  
  socials = user.social;

  if(socials.length!== 0) {
    let i =0;
    for (i = 0; i < socials.length; i++) {
      let id = socials[i];
      console.log(id);
      try {
        media = await Social.findById(id);
      } catch (err) {
        console.log(err);
        const error = new HttpError (
          "Something went wrong, could not find social media.",
          500
        );
      }
      names.push(media.name);
      if (media.name === "Instagram" ) {
        ins = media;
      }
      if (media.name === "Linkedin") {
        linkedin = media;
      }
      if (media.name === "Facebook") {
        facebook = media;
      }
      if (media.name === "Github") {
        github = media;
      }
      if (media.name === "Wechat") {
        wechat = media;
      }
    }
  } 
  console.log(names);
  
  user.mobile = req.body.Mobile;
  user.name = req.body.Username;
  user.officeAddress = req.body.Address;

  let existingPhoto
  try {
      existingPhoto = await Photos.findOne({ owner: userId})
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
  }else{
    const error = new HttpError(
          'profile photo not uploaded.',
          500            
          );
    return next(error);
  }

  
  
  if ( normalizeEmail(req.body.Email) !== user.email) {
    let email;
    email = req.body.Email;
    email = normalizeEmail(email);
    if(validator.validate(email)) {
      let exist;
      try {
        exist = await User.findOne({email:email})
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'Cannot find email.',
          500
        );
        return next(error);
      }

      if(exist) {
        const error = new HttpError (
          'email exists already, please enter new email instead',
          422
        );
        return next(error);
      }
      user.email = email;
    } else {
      console.log(validator.validate(email));
      return next(new HttpError("Invalid email, please check your data.", 422));
    }
  }
   
  if ( normalizeEmail(req.body.Semail) !== user.semail ) {
    let Semail;
    Semail = req.body.Semail;
    Semail = normalizeEmail(Semail);
    if(validator.validate(Semail)) {
      let exist;
      try {
        exist = await User.findOne({semail:Semail})
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'Cannot find Supplementary email.',
          500
        );
        return next(error);
      }

      if(exist) {
        const error = new HttpError (
          'email exists already, please enter new supplementary email instead',
          422
        );
        return next(error);
      }
      user.semail = Semail;
    } else {
      console.log(validator.validate(Semail));
      return next(new HttpError("Invalid Supplementary email, please check your data.", 422));
    }
  }

  // create or update new Social object and save to user.

    const updateLinkedin = {url: req.body.Linkedinurl};
    try {
      await linkedin.updateOne(updateLinkedin);
    } catch (err) {        
      console.log(err);
      const error = new HttpError(
        "Cannot update link.",
        500        
      )
        return next(error);
    };


    const updateIns = {url: req.body.Instagramurl};
    try {
      await ins.updateOne(updateIns);
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Cannot update link.",
        500
      )
      return next(error);
    };

    const updateFacebook = {url: req.body.Facebookurl};
      try {
        await facebook.updateOne(updateFacebook);
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Cannot update link.",
          500
        )
        return next(error);
      };

      const updateGithub = {url: req.body.Githuburl};
      try {
        await github.updateOne(updateGithub);
      } catch (err) {        
        console.log(err);
        const error = new HttpError(
          "Cannot update link.",
          500        
        )
          return next(error);
      };

      const updateWechat = {url: req.body.Wechaturl};
      try {
        await wechat.updateOne(updateWechat);
      } catch (err) {        
        console.log(err);
        const error = new HttpError(
          "Cannot update link.",
          500        
        )
          return next(error);
      };
 


  try {
    await user.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) } );
};

const getFiles = async (req, res, next) => {
  let userId;
  userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate(
      {path: 'documents',
        populate: {
          path: 'tags',
          model: 'Tag'
        }
      });
  } catch (err) {
    console.log(err);
    const error = new HttpError (
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }
  if (!user || user.documents.length === 0) {
    return next(
      new HttpError('Could not find documents for the provided user id.', 404)
    );
  }

  res.json({
    documents: user.documents.toObject({ getters: true })
  });

};

const getOneFile = async (req, res, next) => {
  let document;
  try {
    document = await File.findById(req.params.documentId).populate('tags');
    
  } catch (err) {
    console.log(err);
    return next(err);
  }

  if(!document) {
    return res.send("document doesn't exist in database");
  }
  res.json({
    document: document.toObject({getters: true})
  });

};

const uploadFiles = async (req, res, next) => {
  let userId;
  userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    const error = new HttpError (
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }


  console.log(req.body);

  const { name, highlighted, description, achivement, institution, dateAchieved} = req.body;
  
  const CreatedFile = new File({
    name,
    description,
    path: req.file.path,
    owner: userId,
    highlighted,
    achivement,
    institution,
    dateAchieved,
    tags:[]
  });

  try {
    await CreatedFile.save();
    await user.documents.push(CreatedFile);
    await user.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'creating file failed, please try again.'
    );
    return next(error);
  }

  let i;
  let tag;
  for( i = 0; i<req.body.tagName.length; i ++) {
    try {
      tag = await Tag.findOne({name: req.body.tagName[i], owner: userId});
      
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Could not find tag.",
        500
      );
      return next(error);
    }
    if(!tag) {
      return next(new HttpError("Tag does not exist, please select a valid tag.", 422));
    }
    tag.files.push(CreatedFile);
    CreatedFile.tags.push(tag);


  try {
    await CreatedFile.save();
    await tag.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Saving file failed, please try again.'
    );
    return next(error);
  }
  }


  res.status(201).json({user: user.toObject({ getters : true})});
  
};

// edit document properties 
const editFile = async (req, res, next) => {
  const { name, highlighted, description, achivement, institution, dateAchieved} = req.body;
  let userId = req.user.id;
  let document;
  try {
    document = await File.findById(req.params.documentId).populate('tags');
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "cannot find file in databse",
      500
      );
    return next(error);
  }

  if(!document) {
    return res.send("document doesn't exist in database");
  }
  // TODO, empty tags array in document.

  document.name = name;
  document.highlighted = highlighted;
  document.description = description;
  document.achivement = achivement;
  document.institution = institution;
  document.dateAchieved = dateAchieved;
  // first remove file id from tags' array.
  try {
    await Tag.updateMany(
      {"files" : req.params.documentId},
      { "$pull": { "files": req.params.documentId } }
    )
  } catch(err) {
    console.log(err);
    const error = new HttpError(
      "Cannot update tags, please try again later.",
      500
    );
    return next(error);
  }

  // then remove the tags id from file.
  let j;
  for (j = 0; j<document.tags.length; j++) {
    console.log(document.tags[j]._id);
    try{
      await File.findOneAndUpdate(
        { _id : req.params.documentId },
        { "$pull": { "tags": document.tags[j]._id } }
      )
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Cannot update tags, please try again later.",
        500
      );
      return next(error);
    }
  }

  // add tags to the file .
  let i;
  let tag;
  for( i = 0; i<req.body.tagName.length; i ++) {
    try {
      tag = await Tag.findOne({name: req.body.tagName[i], owner: userId});
      
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Could not find tag.",
        500
      );
      return next(error);
    }
    if(!tag) {
      return next(new HttpError("Tag does not exist, please select a valid tag.", 422));
    }
    tag.files.push(document);
    document.tags.push(tag);


  try {
    await document.save();
    await tag.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Saving file failed, please try again.'
    );
    return next(error);
  }
  }


  try {   
      await document.save();
    } catch (err) {        
      console.log(err);
      const error = new HttpError(
        "Cannot update file.",
        500        
      )
        return next(error);
    };

    res.send({ success : true, message : 'file edit succeed' }); 

};

// delete file and ObjectId from user and tags.
const deleteFile = async (req, res, next) => {

  try {
    await File.findOneAndRemove(
        { _id:  req.params.documentId}, 
        { new: true }
    )

    await Tag.updateMany(
      {"files" : req.params.documentId},
      { "$pull": { "files": req.params.documentId } }
    )
    await User.updateOne(
        { "documents": req.params.documentId },
        { "$pull": { "documents": req.params.documentId } }
    )

} catch(err) {
    console.log(err);
    const error = new HttpError(
      "Cannot find file, please try again later.",
      500
    );
    return next(error);
}

res.json({success: true});
 
};

// download file
const downloadFile = async (req, res, next) => {
  let path;
  let filename;
  let file;
  try {
    file = await File.findById(req.params.documentId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fail to find this document.",
      500
    )
    return next(error);
  };

  if(!file) {
    return next(new HttpError("File does not exist.", 422));
  }

  path = file.path;
  filename = file.name;

  res.download(path, filename);

};

const getSocialLinks = async (req, res, next) => {
  let userId = req.params.uid;
  let socialLinks;
  try {
    socialLinks = await User.findById(userId).populate({path: 'social'});
  } catch (err) {
    console.log(err);
    const error = new HttpError (
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }
  if (!socialLinks || socialLinks.social.length === 0) {
    return next(
      new HttpError('Could not find social links for the provided user id.', 404)
    );
  }

  res.json({
    socials: socialLinks.social.toObject({getters:true})
  });

};

const getOneSocialLink = async (req, res, next) => {
  let userId = req.params.uid;
  let socialName = req.params.name;
  let user;
  let socialLink;

  try{
    user = await User.findById(userId).populate("social");
  }catch(err) {
    console.log(err);
    const error = new HttpError(
      "Find social link failed.",
      500
    )
    return next(error);
  }


  if(! user) {
    return next(new HttpError("Cannot find user for provided Id.", 422));
  }

  let i;
  for (i = 0; i <5; i++) {
    if(user.social[i].name === socialName) {
      socialLink = user.social[i].url;
    }
  };

  if(typeof socialLink === 'undefined') {
    return next(new HttpError("Social media name is invalid."))
  }

  res.json({url: socialLink});


}

const createSocialLink = async (req, res, next) => {
  const { socialName, url } = req.body; 
  let existingUrl;
  try {
    existingUrl = await Social.findOne({url:url});
  }catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fail to find social link, please try again.",
      500
    )
    return next(error);
  };

  if(existingUrl) {
    const error = new HttpError (
      'Socil link exists already, please enter new url',
      422
    );
    return next(error);
  }

  let user;
  try {
    user = await User.findById(req.params.uid);
  } catch (err) {
    console.log(err);
    const error = new HttpError (
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  if(!user) {
    const error = new HttpError (
      'Cannot find user',
      422
    );
    return next(error);   
  }

  const CreatedSocial = new Social({
    name: socialName,
    url: url,
    owner: req.params.uid
  })

  try {
    await CreatedSocial.save();

    await user.social.push(CreatedSocial);

    await user.save();
  } catch(err) {
    console.log(err);
    const error = new HttpError(
      "Cannot save social link to user, please try again.",
      500
      )
      return next(error);
  };

  res.send({
    success: true
  });

};

const updateSocialLink = async (req, res, next) => {
  const { socialName, url } = req.body;

  let social;
  try {
    social = await Social.findById(req.params.socialId);
    
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Find social Failed.",
      500
      );
    return next(error);
  }

  if(!social) {
    return res.send("Social link doesn't exist in database");
  }

  social.name = socialName;
  social.url = url;

  try {   
      await social.save();
    } catch (err) {        
      console.log(err);
      const error = new HttpError(
        "Cannot update social link.",
        500        
      )
        return next(error);
    };

    res.send({ success : true, message : 'social link updates succeed' }); 
};

const deleteSocialLink = async (req, res, next) => {

  try {
    await Social.findOneAndRemove(
        { _id:  req.params.socialId}, 
        { new: true }
    )

    await User.updateOne(
        { "social": req.params.socialId },
        { "$pull": { "social": req.params.socialId } }
    )
} catch(err) {
    console.log(err);
    const error = new HttpError(
      "Cannot find social link, please try again later.",
      500
    );
    return next(error);
}

res.json({success: true});
 
};


exports.getBioinfo = getBioinfo;
exports.updateBioinfo = updateBioinfo;
exports.getAcc = getAcc;
exports.updateAcc = updateAcc;
exports.uploadFiles = uploadFiles;
exports.getFiles = getFiles;
exports.deleteFile = deleteFile;
exports.getOneFile = getOneFile;
exports.editFile = editFile;
exports.downloadFile = downloadFile;
exports.getSocialLinks = getSocialLinks;
exports.getOneSocialLink = getOneSocialLink;
exports.createSocialLink = createSocialLink;
exports.updateSocialLink = updateSocialLink;
exports.deleteSocialLink = deleteSocialLink;