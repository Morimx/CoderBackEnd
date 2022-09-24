const express = require('express');
const SignUp = require('../controller/SignUp');
const bkndLogin = require('../controller/login');

let router = express.Router();

router.route('/signup')
    .get( SignUp );

router.route('/login')
    .get( bkndLogin );


module.exports = router;

