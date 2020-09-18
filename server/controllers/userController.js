// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');
const passport = require("passport");
const bcrypt = require("bcryptjs");



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
  loggedin = res.locals.login;
  res.json( {logIn: loggedin});
};

const signup = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { name, email, password, social, bioinfo} = req.body;
  
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
  let i =0;
  var path = [];
  for (i = 0; i < req.files.length; i++) {
    path.push(req.files[i].path);
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
    documents: path,
    password: hashedPassword,
    social,
    bioinfo
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'creating user failed, please try again.'
    );
    return next(error);
  }
  

  res.status(201).json({user: createdUser.toObject({ getters : true})});
};

const login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/users',
    failureRedirect: '/api/users/login'
  })(req, res, next);
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.check = check;