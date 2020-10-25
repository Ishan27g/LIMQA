// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');
const Social = require('../models/social');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Photos = require('../models/photos');
const Tag = require('../models/tag');
const crypto = require('crypto');
const QRCode = require('qrcode')
const { hrtime } = require('process');

require('dotenv').config();
const nodemailer = require('nodemailer');
const {
  SERVICE,
  EMAIL,
  PASSWORD,
} = process.env

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}).select("-password").populate(
      {path: 'documents',
        populate: {
          path: 'tags',
          model: 'Tag'
        }
      }).populate("social").populate("tags");
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed please try again later.',
      500
    );
    return next(error);
  }
  res.json(
    {users: users.map(user => user.toObject({ getters: true}))}
  );
};

const check = (req, res, next) => {
  let loggedin;
  let id;
  loggedin = res.locals.login;
  id = res.locals.user.id;
  res.json( {logIn: loggedin, userid : id});
};


const signup = async (req, res, next) => {

  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { name, email, password} = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email: email})
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try agin later.',
      500
    );
    return next(error);
  }

  if(existingUser) {
    const error = new HttpError (
      'User exists already, please login instead',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again.", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    documents: [],
    password: hashedPassword,
    social: [],
    bioinfo: "Describe yourself in a few words.",
    semail: "",
    officeAddress: "",
    tags: [],
    mobile: ""
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'creating user failed, please try again.'
    );
    return next(error);
  }
  /**
   * create photos object
   */
  const createdPhotos = new Photos({
    owner : createdUser.id,
    profilePhoto: "",
    coverImages: "",
    bgImage: ["#182848", "#4B6CB7"]
  })
  try {
    await createdPhotos.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'creating photos failed, please try again.'
    );
    return next(error);
  }
  // create some default tags for user.

  const All = new Tag({
    name: "All",
    color: "primary",
    files: [],
    owner: createdUser.id
  })

  const work = new Tag({
    name: "Work-Experience",
    color: "secondary",
    files : [],
    owner : createdUser.id
  });

  const Academic = new Tag({
    name: "Academic",
    color: "info",
    files : [],
    owner : createdUser.id
  });

  const volunteering = new Tag({
    name: "Volunteering",
    color: "light",
    files : [],
    owner : createdUser.id
  });

  const Leadership = new Tag({
    name: "Leadership",
    color: "warning",
    files : [],
    owner : createdUser.id
  });

  const Curricular = new Tag({
    name: "Extra-Curricular",
    color: "success",
    files : [],
    owner : createdUser.id
  });

  try{
      await All.save();
      await work.save();
      await Academic.save();
      await volunteering.save();
      await Leadership.save();
      await Curricular.save();
      await createdUser.tags.push(Default);
      await createdUser.tags.push(work);
      await createdUser.tags.push(Academic);
      await createdUser.tags.push(volunteering);
      await createdUser.tags.push(Leadership);
      await createdUser.tags.push(Curricular);
  } catch (err) {
      console.log(err);
      const error = new HttpError (
          "created tags failed",
          500
      );
  };

  /**
   * create tags object
   const createdTags = new Tags({
    name : "",
    color : "",
    files : [],
    owner : createdUser.id
  })
  try {
    await createdTags.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'creating tags failed, please try again.'
    );
    return next(error);
  }
  */
  /**
   * create social links object
   */
  const CreatedLinkedin = new Social( {
    name: "Linkedin",
    url: "http://Linkedin.com",
    owner: createdUser.id
  });

  const CreatedInstagram = new Social( {
    name: "Instagram",
    url: "http://Instagram.com",
    owner: createdUser.id
  });
  const CreatedFacebook = new Social( {
    name: "Facebook",
    url: "http://Facebook.com",
    owner: createdUser.id
  });

  const CreatedGithub = new Social( {
    name: "Github",
    url: "http://Github.com",
    owner: createdUser.id
  });

  const CreatedWechat = new Social( {
    name: "Wechat",
    url: "http://Wechat.com",
    owner: createdUser.id
  });


  createdUser.photos = createdPhotos;
  try {
    await CreatedLinkedin.save();
    await CreatedInstagram.save();
    await CreatedFacebook.save();
    await CreatedGithub.save();
    await CreatedWechat.save();

 //   await createdUser.tags.push(createdTags)
    await createdUser.social.push(CreatedLinkedin);
    await createdUser.social.push(CreatedFacebook);
    await createdUser.social.push(CreatedInstagram);
    await createdUser.social.push(CreatedGithub);
    await createdUser.social.push(CreatedWechat);
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'creating social failed, please try again.'
    );
    return next(error);
  }
  console.log("User signed up.");
  res.status(201).json({user: createdUser.toObject({ getters : true})});
};
// use passport middle ware to authenticate user.
const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      return next(err);
    }
    if( ! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }

    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      console.log("User logged in.")
      return res.send({ success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
};

const forgotPassword = async (req, res, next) => {

  let user;
  var token;
  try {
    user = await User.findOne({email: req.body.email});
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fail to find user for provided email",
      500
    )
    return next(error);
  };

  if(!user) {
    return next(new HttpError("This user does not exist.", 422));
  }

  try {
    token  = crypto.randomBytes(20).toString('hex');
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fail to generate token.",
      500
    )
    return next(error);
  };


  console.log(token);

  user.resetPasswordToken = token;      // generate a unique token
  user.resetPasswordExpires = Date.now() + 3600000; //  token will be expired in 1 hour.

  try{
    await user.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Cannot save user, please try again.",
      500
      )
      return next(error);
  }

 //Create email transport service
 tr = nodemailer.createTransport({
  service: `${SERVICE}`,
    auth: {
        user: `${EMAIL}`,
        pass: `${PASSWORD}`,
    }
  });
  var host = req.headers.host.split(":")[0] + ':3000'
  //Create email with required properties
  mailOptions = {
    from: `${EMAIL}`,
    to: req.body.email,
    subject: 'Password reset link',
    text:`Navigate to 'http://${host}/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
  }
  //send the email
  tr.sendMail(mailOptions, function(err,data){
    if(err){
      console.log(err);
      console.log('Error sending email')
    }else{
      console.log('email sent')
      res.json({user : user.toObject({getters: true})});
    }
  })
  console.log("Email sent to user.")
}

// check if token has expired or not.
const checkToken = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }});
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find user.",
      500
    )
    return next(error);
  }
  if(!user) {
    return next(new HttpError("Password reset token is invalid or has expired.", 422));
  }

  res.json({
    token: true
  })
}

const resetPassowrd = async (req, res, next) => {

  let user;
  try {
    user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fail to find user for provided email",
      500
    )
    return next(error);
  };

  if(!user) {
    return next(new HttpError("Password reset token is invalid or has expired.", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    const error = new HttpError("Could not create password, please try again.", 500);
    return next(error);
  }

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;      // set token to undefined
  user.resetPasswordExpires = undefined; // set expire time to undefinec.

  try{
    await user.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Cannot save user, please try again.",
      500
      )
      return next(error);
  }
  /*
    send an email to user to notify that user has changed password successfully.
  */
  //Create email transport service
  tr = nodemailer.createTransport({
    service: `${SERVICE}`,
    auth: {
        user: `${EMAIL}`,
        pass: `${PASSWORD}`,
    }
  });
  //Create email with required properties
  mailOptions = {
    from: `${EMAIL}`,
    to: user.email,
    subject: 'Password reset notification',
    text:`Your password has been updated`
  }
  //send the email
  tr.sendMail(mailOptions, function(err,data){
    if(err){
      console.log(err);
      console.log('Error sending email')
    }else{
      console.log('email sent')
      res.json({
        reset: true
      });
    }
  })
  console.log("User password reset complete.")
}


const updatePassword = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  let user;
  try {
    user = await User.findById(req.params.uid);
  } catch (err) {
    console.log(err);
    const error = new HttpError (
      "Find user failed.",
      500
    );
    return next(error);
  }

  if(! user) {
    return next(new HttpError("This user does not exist.", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    const error = new HttpError("Could not create password, please try again.", 500);
    return next(error);
  }

  user.password = hashedPassword;

  try {
    await user.save();
  } catch(err) {
    console.log(err);
    const error = new HttpError(
      "Update password failed, please try again.",
      500
    );
    return next(error);
  }
  console.log("User update password complete.")
  res.json({success:true})
}

const checkPreviousPassword = async (req, res, next) => {

  password = req.body.password;
  let user = req.user;
  let match;
  try {
    match = await bcrypt.compare(password, user.password);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Validate password failed."))
  }

  if (!match ) {
    res.json({
      match:false
    })
  }
  res.json({
    match:true
  });
}

const generateQRCode = (req, res, next) => {
  var url = req.body.url;
  if (url.length === 0) {
    res.send("empty data.");
  }
  QRCode.toDataURL(url, (err, src) => {
    if(err) {
      console.log(err);
      res.send("error occured.");
    }
    console.log("QR code generated.")
    res.send(src);
  })


}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.check = check;
exports.forgotPassword = forgotPassword;
exports.checkToken = checkToken;
exports.resetPassowrd = resetPassowrd;
exports.updatePassword = updatePassword;
exports.checkPreviousPassword = checkPreviousPassword;
exports.generateQRCode = generateQRCode;
