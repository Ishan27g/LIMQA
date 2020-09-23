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
  let all;
  
  var empty = false;
  try {
    socials = await user.social;
  } catch (err) {
    empty = true;
    console.log("empty: "+ empty);
    console.log(err);
  }

  if(!empty) {
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
  }


  
  if (typeof req.body.Username !== 'undefined') {
    user.name = req.body.Username;
  }
  
  if (typeof req.body.Email !== 'undefined') {
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
  
  if (typeof req.body.Address !== 'undefined') {
    user.officeAddress = req.body.Address;
  }
  if (typeof req.body.Mobile !== 'undefined') {
    user.mobile = req.body.Mobile;
  }
  if (typeof req.body.Semail !== 'undefined') {
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
 
  if (typeof req.body.LinkedinName !== 'undefined') {
    
    const { LinkedinName, Linkedinurl } = req.body;
    const CreatedLinkedin = new Social( {
      name: LinkedinName,
      url: Linkedinurl,
      owner: userId
    })
    console.log(CreatedLinkedin);
    
    if (typeof linkedin !== 'undefined') {

      const update = {url: Linkedinurl};
      try {
        await linkedin.updateOne(update);
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Cannot update link.",
          500
        )
        return next(error);
      };

      
    }
    
    if (typeof linkedin === 'undefined') {
      try {
      await CreatedLinkedin.save();
      await user.social.push(CreatedLinkedin);
      await user.save();
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        'creating social failed, please try again.'
      );
      return next(error);
    }
    }

  
    /*try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await CreatedLinkedin.save({ session: sess });
      user.social.push(CreatedLinkedin);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        'Creating social failed, please try again.',
        500
      );
      return next(error);
    }*/
  }

  if (typeof req.body.InstagramName !== 'undefined') {

    const { InstagramName, Instagramurl } = req.body;
    const CreatedInstagram = new Social( {
      name: InstagramName,
      url : Instagramurl,
      owner: userId
    })

    console.log(CreatedInstagram);

    if (typeof ins  !== 'undefined') {

      const update = {url: Instagramurl};
      try {
        await ins.updateOne(update);
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Cannot update link.",
          500
        )
        return next(error);
      };
    }
  
    if (typeof ins  === 'undefined') {
      try {
        await CreatedInstagram.save();
        await user.social.push(CreatedInstagram);
        await user.save();
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'creating social failed, please try again.'
        );
        return next(error);
      }
    }  
  }

  if (typeof req.body.FacebookName !== 'undefined') {

    const { FacebookName, Facebookurl } = req.body;
    const CreatedFacebook = new Social( {
      name: FacebookName,
      url : Facebookurl,
      owner: userId
    })
    console.log(CreatedFacebook);

    if (typeof facebook  !== 'undefined') {
      const update = {url: Facebookurl};
      try {
        await facebook.updateOne(update);
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          "Cannot update link.",
          500
        )
        return next(error);
      };
    }
    
    if (typeof facebook  === 'undefined') {
      try {
        await CreatedFacebook.save();
        await user.social.push(CreatedFacebook);
        await user.save();
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'creating social failed, please try again.'
        );
        return next(error);
      }
    }

  }


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
