// this middle ware uses multer for file uploads feature.
const multer = require('multer');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
// file types that we receive.
const MIME_TYPE_MAP = {
    'application/pdf' : 'pdf',
    'text/plain': 'txt',
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

/*
  this middle ware stores documents that meets the requirements in 'uploads/images'
  directory, and generate a random username for it.
  if the file type doesn't in MIME_TYPE_MAP, it will return an error shows invalid file type.
*/
const fileUpload = multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/images');
      },
      filename: (req, file, cb) => {
          const ext = MIME_TYPE_MAP[file.mimetype];
          cb(null, uuid4() + '.' + ext);
      }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !! MIME_TYPE_MAP[file.mimetype];  
    let error = isValid ? null : new Error('Invalid type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload;
