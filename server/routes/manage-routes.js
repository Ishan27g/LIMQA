const express = require('express');
const manageController = require("../controllers/manageController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");
const { ensureAuthenticated } = require('../middlerware/auth');

router.get('/bioinfo', ensureAuthenticated,  manageController.getBioinfo);
// expect json data send from front-end.
router.put('/bioinfo/:uid', ensureAuthenticated, [ check("bioinfo").not().isEmpty() ], manageController.updateBioinfo);

router.get('/accSetting/:uid', ensureAuthenticated, manageController.getAcc);
// expect form data 
router.put('/accSetting/:uid', ensureAuthenticated, fileUpload.single('profileimg'), manageController.updateAcc);

router.post('/documents/:uid', ensureAuthenticated, fileUpload.single("document"), manageController.uploadFiles);

router.get('/documents/:uid', ensureAuthenticated, manageController.getFiles);

module.exports = router;