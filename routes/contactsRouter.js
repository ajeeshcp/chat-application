const express = require('express');
const { getContacts } = require('../controller/contactController');
const router = express.Router();

router.get('/', getContacts);

module.exports = router;
