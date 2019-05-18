const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require("lodash");
const { sendEmail } = require("../helpers");
const User = require('../models/user');
require('dotenv').config();

exports.sign_up = (req,res) => {
  const user = new User(req.body);
  user.save((err,user) => {
    if (err) return res.status(403).json({error:"Email already exist!"});
    res.status(200).json({message: "Sign up success! Please login."});
  })
};

exports.sign_in = (req,res) => {
  const { email,password } = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user) return res.status(401).json({error: "User not found. Please retry or sign up"});
    if(!user.authenticate(password)) return res.status(401).json({error: "Email and password do not match."});
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

exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email) return res.status(400).json({ message: "No Email in request body" });

  const { email } = req.body;
  // find the user based on email
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user) return res.status("401").json({error: "User with that email does not exist!"});

    // generate a token with user id and secret
    const token = jwt.sign(
        { _id: user._id, iss: "NODEAPI" },
        process.env.JWT_SECRET
    );

    // email data
    const emailData = {
      from: "noreply@node-react.com",
      to: email,
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: ${
          process.env.CLIENT_URL
          }/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <p>${process.env.CLIENT_URL
        }/reset-password/${token}</p>`
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) return res.json({ message: err });
      else {sendEmail(emailData);
        return res.status(200).json({
          message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
        });
      }
    });
  });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user
exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  User.findOne({ resetPasswordLink }, (err, user) => {
    // if err or no user
    if (err || !user) return res.status("401").json({error: "Invalid Link!"});

    const updatedFields = {
      password: newPassword,
      resetPasswordLink: ""
    };

    user = _.extend(user, updatedFields);

    user.save((err, result) => {
      if (err) return res.status(400).json({error: err});
      res.json({message: `Great! Now you can login with your new password.`});
    });
  });
};