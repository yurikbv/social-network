const _ = require('lodash');
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err,user) => {
    if(err || !user) res.status(400).json({error: "User not found"});
    req.profile = user;
    next();
  })
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
  if(!authorized) res.status(403).json({error: "User is not authorized to perform this action"});
};

exports.allUsers = (req,res) => {
  User.find((err,users) => {
    if(err) res.status(400).json({error: err});
    res.json({users});
  }).select("name email createdAt updatedAt")
};

exports.getUser = (req,res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};

exports.updateUser = (req,res) => {
  let user = req.profile; //previous data user
  user = _.extend(user, req.body); //extend - mutate the source object
  user.save((err) => {
    if(err) res.status(400).json({error: "You are not authorized to perform this action"});
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({user})
  })
};

exports.deleteUser = (req,res) => {
  let user = req.profile;
  user.remove((err,user) => {
    if(err) res.status(400).json({error: err});
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({user})
  });
};