const express = require('express');
const userController = require("../controllers/userController");
const photoController = require("../controllers/photosController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");


router.get('/', userController.getUsers);

router.post('/signup', fileUpload.array('files',10), [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(), 
    check("password").isLength({ min: 6 }), ] , userController.signup);

router.post('/login', check('email').normalizeEmail(),userController.login);

router.post('/profilePhoto', fileUpload.single('file'), photoController.addProfilePhoto);
router.get('/profilePhoto', photoController.getProfilePhoto);

module.exports = router;