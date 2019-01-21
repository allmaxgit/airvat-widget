const express = require('express');
const index = require('./main/index.js');
const router = express.Router();

router.get('/', index);

module.exports = router;
