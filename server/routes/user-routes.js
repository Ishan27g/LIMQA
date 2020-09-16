const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");
const { ensureAuthenticated } = require('../middlerware/auth');

router.get('/', userController.getUsers);

router.post('/signup', fileUpload.array('files',10), [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(), 
    check("password").isLength({ min: 6 }), ] , userController.signup);

router.post('/login', check('email').normalizeEmail(), userController.login);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})

router.get('/manage', ensureAuthenticated, (req, res) => res.send('manage'));

module.exports = router;