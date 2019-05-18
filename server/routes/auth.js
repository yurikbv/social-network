const express = require('express');
const router = express.Router();

const {userSignUpValidator, passwordResetValidator} = require('../validator');

//Controllers
const {sign_up, sign_in, sign_out,forgotPassword, resetPassword} = require('../contollers/auth');
const {userById} = require('../contollers/user');

router.post('/api/sign_up',userSignUpValidator, sign_up);
router.post('/api/sign_in', sign_in);
router.get('/api/sign_out', sign_out);

router.put("/api/forgot-password", forgotPassword);
router.put("/api/reset-password", passwordResetValidator, resetPassword);

//Any route containing :userId, our app first execute userById()
router.param("userId", userById);

module.exports = router;