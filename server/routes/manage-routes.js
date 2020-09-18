const express = require('express');
const manageController = require("../controllers/manageController");
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require("../middlerware/file-upload");
const { ensureAuthenticated } = require('../middlerware/auth');

router.get('/bioinfo', ensureAuthenticated,  manageController.getBioinfo);
// expect json data send from front-end.
router.put('/bioinfo', ensureAuthenticated,  manageController.updateBioinfo);

module.exports = router;