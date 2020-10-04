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

// document related routes below.
router.post('/documents/:uid', ensureAuthenticated, fileUpload.single("document"), manageController.uploadFiles);

router.get('/documents/:uid', ensureAuthenticated, manageController.getFiles);

router.get('/OneDocument/:documentId', manageController.getOneFile);

router.delete('/documents/:uid/:documentId', ensureAuthenticated, manageController.deleteFile);

router.put('/editDocument/:documentId', ensureAuthenticated, manageController.editFile);


// social links related routes below.
router.get('/social/:uid', ensureAuthenticated, manageController.getSocialLinks);

router.get('/social/onelink/:socialId', ensureAuthenticated, manageController.getOneSocialLink);

router.post('/social/:uid', ensureAuthenticated, manageController.createSocialLink);

router.put('/social/:uid/:socialId', ensureAuthenticated, manageController.updateSocialLink);

router.delete('/social/:uid/:socialId', ensureAuthenticated, manageController.deleteSocialLink);

//tags related routes below
router.post('/tags/:uid', ensureAuthenticated, manageController.addTagsForUser);
router.post('/tags/:uid/:documentId', ensureAuthenticated, manageController.addTagsToUserFile);

router.get('/tags/:uid', ensureAuthenticated, manageController.getTagsForUser);
router.get('/tags/:uid/:documentId', ensureAuthenticated, manageController.getTagsOfUserFile);
router.get('/tags/:uid/:tagId', ensureAuthenticated, manageController.getFilesForUserTag);
router.get('/tags/', ensureAuthenticated, manageController.getAllTagsForAllUsers);

module.exports = router;