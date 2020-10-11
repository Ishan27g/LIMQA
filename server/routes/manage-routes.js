const express = require('express');
const manageController = require("../controllers/manageController");
const tagsController = require("../controllers/tagsController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");
const { ensureAuthenticated } = require('../middlerware/auth');

router.get('/bioinfo/:uid',  manageController.getBioinfo);
// expect json data send from front-end.
router.put('/bioinfo/:uid', ensureAuthenticated, [ check("bioinfo").not().isEmpty() ], manageController.updateBioinfo);

router.get('/accSetting/:uid', ensureAuthenticated, manageController.getAcc);
// expect form data 
router.put('/accSetting/:uid', ensureAuthenticated, fileUpload.single('profileimg'), manageController.updateAcc);

// document related routes below.
router.post('/documents/:uid', ensureAuthenticated, fileUpload.single("document"), manageController.uploadFiles);

router.get('/documents/:uid', manageController.getFiles);

router.get('/OneDocument/:documentId', manageController.getOneFile);

router.delete('/documents/:uid/:documentId', ensureAuthenticated, manageController.deleteFile);

router.put('/editDocument/:documentId', ensureAuthenticated, manageController.editFile);

router.get('/download/:documentId', manageController.downloadFile);


// social links related routes below.
router.get('/social/:uid', manageController.getSocialLinks);

router.get('/social/:uid/:name', manageController.getOneSocialLink);

router.post('/social/:uid', ensureAuthenticated, manageController.createSocialLink);

router.put('/social/:uid/:socialId', ensureAuthenticated, manageController.updateSocialLink);

router.delete('/social/:uid/:socialId', ensureAuthenticated, manageController.deleteSocialLink);

// create a new tag for a user
/* json payload 
    {"name":"testTag4","color":"black"} 
*/
router.post('/tags/:uid', ensureAuthenticated, tagsController.addTagsForUser);

// create a new tag and link to 1 document
/* json payload
    {"name":"testTag3","color":"green"} 
*/
router.post('/tags/:uid/:documentId', ensureAuthenticated, tagsController.addTagsToUserFile);

//get info for all tags for a user
router.get('/tags/:uid', tagsController.getTagsForUser);

//get all tags for all users
router.get('/tags/', tagsController.getAllTagsForAllUsers);

module.exports = router;