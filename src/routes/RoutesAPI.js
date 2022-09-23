const express = require('express');
const SignUp = require('../controller/SignUp');

let router = express.Router();

router.route('/signup')
    .get( SignUp );

module.exports = router;

