// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');



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

const signup = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { name, email, password, social} = req.body;
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

  const createdUser = new User({
    name,
    email,
    image : 'https://www.google.com/search?q=user+icon&rlz=1C5CHFA_enAU761AU761&sxsrf=ALeKk00fLMpTpKAC6qyRYyGE18RpT9OwyQ:1599299367370&tbm=isch&source=iu&ictx=1&fir=CRnY8psxz2WEvM%252CAbaBnhIZwWRSVM%252C_&vet=1&usg=AI4_-kQ6uVXTbAUGLP08PnL8nhZ-0P-Cow&sa=X&ved=2ahUKEwjtxLm13tHrAhXBfX0KHaWvDdoQ9QF6BAgKEGc&biw=1309&bih=746#imgrc=CRnY8psxz2WEvM',
    password,
    social
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

const login = async (req, res, next) => {

  const { email, password } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email: email})
  } catch (err) {
    const error = new HttpError(
      'logging in failed, please try agin later.',
      500
    );
    return next(error);
  }

  if(!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid crendectials, could not log in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
