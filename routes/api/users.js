const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

const postValidation = [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password length should be 6 characters or more').isLength({ min: 6 })
];

// @route   GET api/users
// @desc    Register user
// @access  public
router.post('/', postValidation, (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ errors: error.array() });
    }

    res.send('User route');
});


module.exports = router;