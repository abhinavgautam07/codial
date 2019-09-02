const Comment = require('../models/comments');
const post = require('../models/post_schema');
module.exports.create = function (req, res) {
  post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create({
        content: req.body.content,
        post: req.body.post, //or post._id
        user:req.user._id
      },function(err,comment){
        //handle err
        post.comments.push(comment);
        post.save();

        res.redirect('back');
      })

    }

  });


}