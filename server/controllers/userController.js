// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');
const Social = require('../models/social');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Photos = require('../models/photos');
const crypto = require('crypto');
const { hrtime } = require('process');


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}).select("-password").populate(
      {path: 'documents',
        populate: {
          path: 'tags',
          model: 'Tag'
        } 
      }).populate("social");
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
    bioinfo: "This is bioinfo message",
    semail: "stest@test.com",
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
    bgImage: ""
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
  /*  could you send link in this format? I want to have the token string in url,
    so that I can look up this token in database.
    'http://' + req.headers.host + '/reset/' + token + '\n\n' +

  */

  res.json({user : user.toObject({getters: true})});

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

  res.json({
    reset: true
  });

}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.check = check;
exports.forgotPassword = forgotPassword;
exports.checkToken = checkToken;
exports.resetPassowrd = resetPassowrd;