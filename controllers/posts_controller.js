const Post = require('../models/post_schema');
const Comment = require('../models/comments');
const User=require('../models/users_schema');
module.exports.create = async function (req, res) {
  try {
    let posthelper = await Post.create({
      content: req.body.postContent,
      user: req.user._id
    });
    //we are using postHelper as .populate donot work with create it works only with find
    //and to show user which was earlier printed undefined we need to populate the post
    let post=await Post.findById(posthelper._id)
    .populate('user');
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post
        },
        message: "Post created!"
      });
    }
    return res.redirect('back');

  } catch (err) {
    console.log('Error', err);
    return res.redirect('back');

  }

}

module.exports.destroy = async function (req, res) {

  try {
    let post = await Post.findById(req.params.id);

    //check if the it is the same user who has created the post is deleting it(line 29)
    //post.user is id of the user who has created the post refer to post schema  type is objectId
    // when we are comparing two ids we need to convert them to strings ,mongoose provide a way
    //ideally it should be req.user._id  but mongoose provide a way to convert it to string by doing req.user.id
    if (post.user == req.user.id) {
      //post.remove works on the object and Post.delete works on the collection name
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      if(req.xhr){
        return res.status(200).json({
          data: {
          post_id:req.params.id
          },
          message:"post deleted!"
        });
      }
      return res.redirect('back');

    }

    else {
      return res.redirect('back');
    }


  } catch (err) {
    console.log('Error', err);
    return res.redirect('back');

  }

}