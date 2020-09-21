const express = require('express');
const manageController = require("../controllers/manageController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");
const { ensureAuthenticated } = require('../middlerware/auth');

router.get('/bioinfo', ensureAuthenticated,  manageController.getBioinfo);
// expect json data send from front-end.
router.put('/bioinfo', [ check("bioinfo").not().isEmpty() ], ensureAuthenticated,  manageController.updateBioinfo);

router.get('/changeEmail', ensureAuthenticated,  manageController.getEmail);
// expect json data send from front-end.
router.put('/changeEmail', [ check("email").normalizeEmail().isEmail() ], ensureAuthenticated,  manageController.updateEmail);

module.exports = router;