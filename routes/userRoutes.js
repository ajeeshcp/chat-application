const express = require('express');
const { register, login } = require('../controller/userController');
const { validationResult } = require('express-validator');
const { validate } = require('../middleware/user-validation');
const router = express.Router();

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
}

router.post('/register',validate('register'), checkValidation, register);
router.post('/login',validate('login'), checkValidation, login);

module.exports = router;
