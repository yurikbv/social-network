const express = require('express');
const router = express.Router();

const {userById,allUsers, getUser, updateUser,deleteUser, userPhoto
    ,addFollowing, addFollower, removeFollowing, removeFollower, findPeople
} = require('../contollers/user');
const {requireSignIn} = require('../contollers/auth');

router.put('/api/user/follow', requireSignIn, addFollowing, addFollower);
router.put('/api/user/un_follow', requireSignIn, removeFollowing, removeFollower);

router.get('/api/users', allUsers);
router.get('/api/user/:userId', requireSignIn, getUser);
router.put('/api/user/:userId', requireSignIn, updateUser);
router.delete('/api/user/:userId', requireSignIn, deleteUser);

//photo
router.get('/api/user/photo/:userId', userPhoto);

//who follow
router.get('/api/user/find_people/:userId', requireSignIn, findPeople);

//Any route containing :userId, our app first execute userById()
router.param("userId", userById);

module.exports = router;