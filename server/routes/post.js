const express = require('express');
const router = express.Router();

const validator = require('../validator');

//Controllers
const {getPosts,createPost} = require('../contollers/post');

router.get('/', getPosts);
router.post('/post', validator.createPostValidator, createPost);

module.exports = router;