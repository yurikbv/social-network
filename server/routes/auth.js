const express = require('express');
const router = express.Router();

const {userSignUpValidator} = require('../validator');

//Controllers
const {sign_up, sign_in, sign_out} = require('../contollers/auth');

router.post('/sign_up',userSignUpValidator, sign_up);
router.post('/sign_in', sign_in);
router.get('/sign_in', sign_in);

module.exports = router;