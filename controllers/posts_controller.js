const Post = require('../models/post_schema');
module.exports.create = function (req, res) {

  console.log(req.body);
Post.create({
content:req.body.postContent,
user:req.user._id


},function(err,post){
if(err){
console.log('errr in posting',err);
return;
}

return res.redirect('back');

});


}