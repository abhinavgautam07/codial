const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true

  },//id of the user posting
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'

  },

//include the ids of all comments on this post in an array
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }
  ]
}, {
    timestamps: true


  });


const Post = mongoose.model('Post', postSchema);
module.exports = Post;