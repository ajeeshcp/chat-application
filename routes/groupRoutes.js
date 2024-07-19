const express = require('express');
const { createGroup, addMember, removeMember } = require('../controller/groupController');
const { validate } = require('../middleware/group-validation');
const { validationResult } = require('express-validator');
const router = express.Router();
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
}

router.post('/create',validate('create'), checkValidation, createGroup);
router.post('/addMember',validate('addMember'), checkValidation, addMember);
router.delete('/removeMember',validate('removeMember'), checkValidation, removeMember);

module.exports = router;
