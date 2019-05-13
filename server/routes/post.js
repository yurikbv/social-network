const express = require('express');
const router = express.Router();

const {createPostValidator} = require('../validator');

//Controller
const {getPosts,createPost, postsByUser, postById, isPoster, deletePost, updatePost} = require('../contollers/post');
const {requireSignIn} = require('../contollers/auth');
const {userById} = require('../contollers/user');


router.get('/api/posts', getPosts);
router.post('/api/post/new/:userId',requireSignIn, createPost, createPostValidator);
router.get('/api/posts/by/:userId', requireSignIn, postsByUser);
router.put('/api/post/:postId', requireSignIn, isPoster, updatePost);
router.delete('/api/post/:postId', requireSignIn, isPoster, deletePost);

//Any route containing :userId, our app first execute userById()
router.param("userId", userById);
//Any route containing :postId, our app first execute postById()
router.param("postId", postById);

module.exports = router;