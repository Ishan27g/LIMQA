// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const User = require('../models/user');
const Social = require('../models/social');
const Tag = require('../models/tag');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Photos = require('../models/photos');



const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}).select("-password");
  } catch (err) {
    const error = new HttpError(
      'Fetching users failedm please try again later.',
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

  /*const cretedSocial = new Social({
    name =
  })*/
  const createdPhotos = new Photos({
    email : email,
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

  const createdUser = new User({
    name,
    email,
    documents: [],
    password: hashedPassword,
    social: [], 
    bioinfo: "This is bioinfo message",
    semail: "stest@test.com",
    photos: createdPhotos, 
    officeAddress: "",
    mobile: "",
    tags: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'creating user failed, please try again.',
      500
    );
    return next(error);
  }

  const CreatedLinkedin = new Social( {
    name: "Linkedin",
    url: "http://Linkedin.com",
    owner: createdUser.id
  });

  const CreatedInstagram = new Social( {
    name: "Instagram",
    url: "http://Instagram.com",
    owner: createdUser.id
  })
  const CreatedFacebook = new Social( {
    name: "Facebook",
    url: "http://Facebook.com",
    owner: createdUser.id
  })

  const work = new Tag({
    name: "Work-Experience",
    color: "red",
    files: [],
    owner: createdUser.id
  });
   
  const Academic = new Tag({
    name: "Academic",
    color: "blue",
    files: [],
    owner: createdUser.id
  });

  const volunteering = new Tag({
    name: "Volunteering",
    color: "green",
    files: [],
    owner: createdUser.id
  });

  const Leadership = new Tag({
    name: "Leadership",
    color: "brown",
    files: [],
    owner: createdUser.id
  });

  const Curricular = new Tag({
    name: "Extra-Curricular",
    color: "yellow",
    files: [],
    owner: createdUser.id
  }); 

  try {
    // save default links
    await CreatedLinkedin.save();
    await CreatedInstagram.save();
    await CreatedFacebook.save();
    // save default tags
    await work.save();
    await Academic.save();
    await volunteering.save();
    await Leadership.save();
    await Curricular.save();

    await createdUser.social.push(CreatedLinkedin);
    await createdUser.social.push(CreatedFacebook);
    await createdUser.social.push(CreatedInstagram);

    await createdUser.tags.push(work);
    await createdUser.tags.push(Academic);
    await createdUser.tags.push(volunteering);
    await createdUser.tags.push(Leadership);
    await createdUser.tags.push(Curricular);
    
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


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.check = check;
