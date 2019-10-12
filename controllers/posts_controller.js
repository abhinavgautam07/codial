const Post = require('../models/post_schema');
const Comment =require('../models/comments');
module.exports.create = function (req, res) {

 
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

module.exports.destroy=function(req,res){
Post.findById(req.params.id,function(err,post){
//check if the it is the same user who has created the post is deleting it(line 29)
//post.user is id of the user who has created the post refer to post schema  type is objectId
// when we are comparing two ids we need to convert them to strings ,mongoose provide a way
//ideally it should be req.user._id  but mongoose provide a way to convert it to string by doing req.user.id
if(post.user==req.user.id){
  //post.remove works on the object and Post.delete works on the collection name
post.remove();

Comment.deleteMany({post:req.params.id},function(err){
return res.redirect('back');

})

}else{
  return res.redirect('back');
}


})

}