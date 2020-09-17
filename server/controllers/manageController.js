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



exports.getBioinfo = getBioinfo;
