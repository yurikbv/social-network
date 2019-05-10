const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto'); //library in node js

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,

}, {timestamps: true});

//virtual field
userSchema.virtual('password')
    .set(function (password) {
      this._password = password; //Create temp variable _password
      this.salt = uuidv1();
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
      return this._password;
    });

//methods
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword: function (password) {
    if(!password) return '';
    try {
      return crypto.createHmac('sha1',this.salt)
          .update(password)
          .digest('hex');
    } catch (e) {
      return '';
    }
  }
};

module.exports = mongoose.model('User',userSchema);