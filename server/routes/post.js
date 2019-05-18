
const express = require('express');
const router = express.Router();

const {createPostValidator} = require('../validator');

//Controller
const {getPosts,createPost, postsByUser, postById, isPoster,
  deletePost, updatePost, postPhoto, singlePost, like, unlike, comment, uncomment} = require('../contollers/post');
const {requireSignIn} = require('../contollers/auth');
const {userById} = require('../contollers/user');



router.get('/api/posts', getPosts);

//like unlike
router.put('/api/post/like', requireSignIn, like);
router.put('/api/post/unlike', requireSignIn, unlike);

//comments
router.put('/api/post/comment', requireSignIn, comment);
router.put('/api/post/uncomment', requireSignIn, uncomment);

router.put("/api/post/:postId", requireSignIn, isPoster, updatePost);
router.post('/api/post/new/:userId',requireSignIn, createPost, createPostValidator);
router.get('/api/posts/by/:userId', requireSignIn, postsByUser);
router.get('/api/post/:postId', singlePost);
router.delete('/api/post/:postId', requireSignIn, isPoster, deletePost);

//photo
router.get('/api/post/photo/:postId', postPhoto);


//Any route containing :userId, our app first execute userById()
router.param("userId", userById);
//Any route containing :postId, our app first execute postById()
router.param("postId", postById);

module.exports = router;