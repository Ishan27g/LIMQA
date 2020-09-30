const express = require('express');
const userController = require("../controllers/userController");
const photoController = require("../controllers/photosController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");


router.get('/', userController.getUsers);

router.get('/check', userController.check);

router.post('/signup', fileUpload.array('files',10), [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(), 
    check("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, "i") ] , userController.signup);

router.post('/login', check('email').normalizeEmail(),userController.login);

router.post('/profilePhoto', fileUpload.single('file'), photoController.addProfilePhoto);
router.get('/profilePhoto', photoController.getProfilePhoto);
router.get('/logout', (req, res) => {
    req.logout();
    res.send({ success : true, message : 'logged out' }); 
})
// this route send the login status back to front end.
router.get('/check', userController.check);

router.post('/coverImages', fileUpload.array('files',5), photoController.addCoverImages);
router.get('/coverImages', photoController.getCoverImages);
router.get('/coverImages/:id', photoController.getCoverImagesById);

module.exports = router;