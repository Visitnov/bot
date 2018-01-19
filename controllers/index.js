var express = require('express');
var router = express.Router();

console.log("Inside index.js");
router.use('/', require('./home'));
module.exports = router;