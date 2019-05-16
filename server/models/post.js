const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  likes: [{type: ObjectId, ref: "User"}]
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);


