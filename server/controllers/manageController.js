// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const normalizeEmail = require('normalize-email');
const validator = require("email-validator");
const  User = require('../models/user');
const Social = require('../models/social');
const social = require('../models/social');
const { db } = require('../models/user');


const getBioinfo = async (req, res, next) => {
  let user = req.user;
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

  // if (!places || places.length === 0) {
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
  let media;
  let ins;
  let linkedin;
  let facebook;
  
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
      console.log("media is "+ media);
      if (media.name === "Instagram" ) {
        ins = media;
      }
      if (media.name === "Linkedin") {
        linkedin = media;
      }
      if (media.name === "Facebook") {
        facebook = media;
      }
    }
  } 
  
  user.mobile = req.body.Mobile;
  user.name = req.body.Username;
  user.officeAddress = req.body.Address;
  
  
  if (normalizeEmail(req.body.Email) !== user.email) {
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
  
    
  
  if (normalizeEmail(req.body.Semail) !== user.semail) {
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

  let newsocial;
  try {
    newsocial = await Social.find({});
  } catch (err) {
    console.log(err);
    const error = new HttpError (
      "Something went wrong, could not find social media.",
      500
    );
  }
  console.log("after update "+ newsocial);


  res.status(200).json({ user: user.toObject({ getters: true }) } );
};


exports.getBioinfo = getBioinfo;
exports.updateBioinfo = updateBioinfo;
exports.getAcc = getAcc;
exports.updateAcc = updateAcc;
