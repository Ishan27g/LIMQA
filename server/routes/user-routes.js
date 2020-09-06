const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();
const { check } = require('express-validator');



router.get('/', userController.getUsers);

router.post('/signup',[
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(), 
    check("password").isLength({ min: 6 }), ] , userController.signup);

router.post('/login', check('email').normalizeEmail(),userController.login);

module.exports = router;