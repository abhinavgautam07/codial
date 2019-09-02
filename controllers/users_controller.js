const Users=require('../models/users_schema');
const Post=require('../models/post_schema');
const mongoose=require('mongoose');
module.exports.signIn=function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }
 return  res.render('sign_in',{
      title:"signIn"
   });
}

module.exports.signUp=function(req,res){
  //isAuthenticated is global as req is global passport just adds the property isAuthenticated to it
 if(req.isAuthenticated()){
   res.redirect('/users/profile');
 }
  return res.render('sign_up',{
      title:"signUp"
   });
}

module.exports.createUser=function(req,res){
if(req.body.password != req.body.confirm_password){
   return res.redirect('back');
}

Users.findOne({email : req.body.email},function(err,user){
   if(err){
console.log('error in finding ');return;
   }
   if(!user){
      Users.create(req.body,function(err,newUser){
if(err){
   console.log('error in creating new user');
   return;
}
return res.redirect('/users/sign-in');

      });
   }
   else{
      return res.redirect('back');
   }

});




}
module.exports.createSession=function(req,res){
   return res.redirect('/users/profile/');
}



module.exports.profile=function(req,res){
//   Post.find({},function(err,post){
// return res.render('profile',{
//   title:'codial|profile',
//   post:post
// });

//   });


Post.find({}).populate('user').exec(function(err,posts){

  console.log(posts);
  return res.render('profile', {
      title: "Codeial | Profile",
      posts:  posts
  });
});


}
module.exports.destroyUser=function(req,res){
  req.logout();
  return res.redirect('/');
}