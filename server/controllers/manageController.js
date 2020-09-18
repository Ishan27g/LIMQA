// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');
const passport = require("passport");
const bcrypt = require("bcryptjs");



const getBioinfo = async (req, res, next) => {
  let user = req.user;
  res.json(
    {bioinfo: user.bioinfo,
    username: user.name,
    useremail: user.email}
  );
};

const updateBioinfo  = async (req, res, next) => {

  const { bioinfo } = req.body;

  let user;
  try {
    user = await User.findOne({email: req.user.email});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
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
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};




exports.getBioinfo = getBioinfo;
exports.updateBioinfo = updateBioinfo;
