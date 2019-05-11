const express = require('express');
const router = express.Router();

const {userSignUpValidator} = require('../validator');

//Controllers
const {sign_up, sign_in, sign_out} = require('../contollers/auth');
const {userById} = require('../contollers/user');

router.post('/sign_up',userSignUpValidator, sign_up);
router.post('/sign_in', sign_in);
router.get('/sign_out', sign_out);

//Any route containing :userId, our app first execute userById()
router.param("userId", userById);

module.exports = router;