const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const Post = require('../models/post');

exports.postById = (req,res,next,id) => {
  Post.findById(id)
      .populate("postedBy", "_id name")
      .exec((err,post) => {
        if(err || !post) return res.status(400).json({error: err});
        req.post = post;
        next();
      })
};

exports.getPosts = (req,res) => {
  Post.find()
      .populate('postedBy','_id name')
      .select("_id title body ")
      .then(posts => res.json({posts}))
      .catch(err => console.log(err))
};

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err,fields,files) => {
    if(err) return res.status(400).json({error: "Image could not be uploaded"});
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    if(files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err,result) => {
      if(err) return res.status(400).json({error: err});
      res.json(result);
    });
  })
};

exports.postsByUser = (req,res) => {
  Post.find({postedBy: req.profile._id})
      .populate("postedBy","_id name")
      .sort('_createdAt')
      .exec((err,posts) => {
        if(err) return res.status(400).json({error: err});
        res.json({posts});
      })
};

exports.isPoster = (req,res,next) => {
  console.log(req.auth);
  let isPoster = req.post && req.auth && (String(req.post.postedBy._id) === String(req.auth._id));
  if(!isPoster) return res.status(403).json({error:"User is not authorized"});
  next();
};

exports.updatePost = (req,res) => {
  let post = req.post;
  post = _.extend(post,req.body);
  post.save((err) => {
    if(err) return res.status(400).json({error: err});
    res.json(post);
  })
};

exports.deletePost = (req,res) => {
  let post = req.post;
  post.remove((err) => {
    if(err) return res.status(400).json({error: err});
    res.json({message: "Post deleted successfully"});
  });
};