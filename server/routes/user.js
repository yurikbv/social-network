const express = require('express');
const router = express.Router();

const {userById,allUsers, getUser, updateUser,deleteUser} = require('../contollers/user');
const {requireSignIn} = require('../contollers/auth');

router.get('/api/users', allUsers);
router.get('/api/user/:userId', requireSignIn, getUser);
router.put('/api/update_user/:userId', requireSignIn, updateUser);
router.delete('/api/delete_user/:userId', requireSignIn, deleteUser);
//Any route containing :userId, our app first execute userById()
router.param("userId", userById);

module.exports = router;