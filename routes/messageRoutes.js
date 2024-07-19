const express = require('express');
const { getMessages, getIndividualMessages } = require('../controller/messageController');
const { validationResult } = require('express-validator');
const { validate } = require('../middleware/message-validation');
const router = express.Router();

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
}

router.get('/:groupId',validate('getMessages'), checkValidation, getMessages);
router.get('/individual/:userId',validate('getIndividualMessages'), checkValidation, getIndividualMessages);

module.exports = router;
