// set up user routes for use signup, login, and logout.
// signup api: /api/users/signup
// login api: /api/users/login
const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();
// middle ware for input value check.
const { check } = require('express-validator');
// middle ware for documents uploads.
const fileUpload = require("../middlerware/file-upload");

router.get('/', userController.getUsers);

/*
    put the fileupload middle ware here to receive the documents sent with request.
    check middle ware is used to validate if the user inputs meets our requirements.
*/
router.post('/signup', fileUpload.array('documents',10), [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(), 
    check("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, "i") ] , userController.signup);

router.post('/login', check('email').normalizeEmail(), userController.login);

router.get('/logout', (req, res) => {
    req.logout();
    res.send({ success : true, message : 'logged out' }); 
})
// this route send the login status back to front end.
router.get('/check', userController.check);


module.exports = router;
