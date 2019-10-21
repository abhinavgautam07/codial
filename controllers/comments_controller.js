const Comment = require('../models/comments');
const Post = require('../models/post_schema');
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post, //or post._id
        user: req.user._id
      });

      post.comments.push(comment._id);
      post.save();
      return res.redirect('/');

    }
  } catch (err) {
    console.log('Error', err);
    return;

  }


}
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    let postId = comment.post;

    let post = await Post.findById(postId);
    let userId = post.user;
    if (comment.user == req.user.id || req.user.id == userId) {

      comment.remove();
      post.update(postId, { $pull: { comments: req.params.id } }, function (err, post) {
        return res.redirect('back');
      });


    } else {
      return res.redirect('back');
    }


  } catch (err) {
    console.log('Error', err);
    return;
  }

  


  



}
