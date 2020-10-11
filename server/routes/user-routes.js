const express = require('express');
const userController = require("../controllers/userController");
const photoController = require("../controllers/photosController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");
const { ensureAuthenticated } = require('../middlerware/auth');


router.get('/', userController.getUsers);

// this route send the login status back to front end.
router.get('/check', userController.check);

router.post('/signup', fileUpload.array('files',10), [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(), 
    check("password").isLength({ min: 6 }), ] , userController.signup);

router.post('/login', check('email').normalizeEmail(),userController.login);
router.get('/logout', (req, res) => {
    req.logout();
    res.send({ success : true, message : 'logged out' }); 
})


router.post('/profilePhoto/:uid', ensureAuthenticated, fileUpload.single('file'), photoController.addProfilePhoto);
router.get('/profilePhoto/:uid', photoController.getProfilePhoto);
router.delete('/profilePhoto/:uid', ensureAuthenticated, photoController.deleteProfilePhoto);

router.post('/coverImages/:uid', ensureAuthenticated, fileUpload.array('files',5), photoController.addCoverImages);
router.get('/coverImages/:uid', photoController.getCoverImages);
router.get('/coverImages/:uid/:id', photoController.getCoverImagesById);
router.delete('/coverImages/:uid/:id', ensureAuthenticated, photoController.delCoverImagesById);

router.post('/bgImage/:uid', ensureAuthenticated, fileUpload.single('file'), photoController.addBgImage);
router.get('/bgImage/:uid', photoController.getBgImage);
router.delete('/bgImage/:uid', ensureAuthenticated, photoController.delBgImage);

module.exports = router;