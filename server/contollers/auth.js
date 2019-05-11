const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
require('dotenv').config();

exports.sign_up = (req,res) => {
  const user = new User(req.body);
  user.save((err,user) => {
    if (err) res.status(403).json({error:"Email already exist!"});
    res.status(200).json({message: "Sign up success! Please login."});
  })
};

exports.sign_in = (req,res) => {
  const { email,password } = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user) res.status(401).json({error: "User not found. Please retry or sign up"});
    if(!user.authenticate(password)) res.status(401).json({error: "Email and password do not match."});
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    res.cookie("t", token, {expire: new Date() + 9999});
    const {_id, name, email} = user;
    return res.json({token, user: {_id,name,email}})
  })
};

exports.sign_out = (req,res) => {
  res.clearCookie('t');
  res.json({message: "Sign out success!"});
};

exports.requireSignIn = expressJwt({
  // if token is valid, express jwt appends the verified users id in
  // an auth key to the request object
  secret: process.env.JWT_SECRET,
  requestProperty: "auth"
});