const express = require('express');
const router = express.Router();

const validator = require('../validator');

//Controllers
const {getPosts,createPost} = require('../contollers/post');
const {requireSignIn} = require('../contollers/auth');
const {userById} = require('../contollers/user');



router.get('/', getPosts);
router.post('/post', requireSignIn, validator.createPostValidator, createPost);

//Any route containing :userId, our app first execute userById()
router.param("userId", userById);


module.exports = router;