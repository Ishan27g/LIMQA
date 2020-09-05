// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');

const DUMMY_USERS = [
    {
        name: "qunzhi wang",
        email: "test@test.com",
        password: "test",
        social: "http"
    }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
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

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
