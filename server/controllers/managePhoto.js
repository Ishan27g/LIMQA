// const uuid = require('uuid/v4');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const {validationResult } = require("express-validator");
const  User = require('../models/user');
const passport = require("passport");
const bcrypt = require("bcryptjs");

var fs = require('fs');


const getProfilePhoto = async (req, res, next) => {
    console.log("nice")
    
    res.json(
      {asdaasda: true}
    );
  };
  
const addProfilePhoto = async (req, res, next) =>{
    console.log("nice")
    console.log("nice")

   
    res.status(201).json({asdaasda:true});
  
}

exports.getProfilePhoto = getProfilePhoto;
exports.addProfilePhoto = addProfilePhoto;