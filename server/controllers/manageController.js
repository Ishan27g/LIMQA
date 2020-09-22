// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');




const getBioinfo = async (req, res, next) => {
  let user = req.user;
  res.json(
    {bioinfo: user.bioinfo,
    username: user.name,
    useremail: user.email,
    userID : user.id}
  );
};

const updateBioinfo  = async (req, res, next) => {
  
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

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

const getEmail = async (req, res, next) => {
  let user = req.user;
  res.json(
    {email: user.email,
     username: user.name,}
  );
};

const updateEmail  = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { email } = req.body;

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
    user.email = email;
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

const getUsername = async (req, res, next) => {
  let user = req.user;
  res.json(
    {username: user.name}
  );
};

const updateUsername  = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { name } = req.body;

  let user;
  try {
    user = await User.findOne({name: req.user.name});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }
  if(user) {
    user.name = name;
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

const getMobile = async (req, res, next) => {
  let user = req.user;
  res.json(
    {mobile: user.mobile,
     username: user.name}
  );
};

const updateMobile  = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { mobile } = req.body;
  const { officeAddress } = req.body;

  let user;
  try {
    user = await User.findOne({moile: req.user.mobile});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }
  if(user) {
    user.mobile = mobile;
    user.officeAddress = officeAddress;
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

const getAddress = async (req, res, next) => {
  let user = req.user;
  res.json(
    {address: user.officeAddress,
     username: user.name,
     email: user.email}
  );
};

const updateAddress  = async (req, res, next) => {
  const error =  validationResult(req);
  if(!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }

  const { officeAddress } = req.body;

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
    user.officeAddress = officeAddress;
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
exports.getEmail = getEmail;
exports.updateEmail = updateEmail;
exports.getUsername = getUsername;
exports.updateUsername = updateUsername;
exports.getMobile = getMobile;
exports.updateMobile = updateMobile;
exports.getAddress = getAddress;
exports.updateAddress = updateAddress;
