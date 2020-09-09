const multer = require('multer');
const {v4:uuid4} =require('uuid');
const HttpError = require('../models/http-error');
const MIME_TYPE_MAP = {
    'application/pdf' : 'pdf',
    'plain/text': 'txt',
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}
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
