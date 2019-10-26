const User = require('../models/users_schema');
const Post = require('../models/post_schema');
const mongoose = require('mongoose');
module.exports.signIn = function (req, res) {

  if (req.isAuthenticated()) {

    return res.redirect('/users/profile')
  }
  return res.render('sign_in', {
    title: "signIn"
  });
}

module.exports.signUp = function (req, res) {
  //isAuthenticated is global as req is global passport just adds the property isAuthenticated to it
  if (req.isAuthenticated()) {

    res.redirect('/users/profile');
  }
  return res.render('sign_up', {
    title: "signUp"
  });
}

module.exports.createUser = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in finding '); return;
    }
    if (!user) {
      User.create(req.body, function (err, newUser) {
        if (err) {
          console.log('error in creating new user');
          return;
        }
        return res.redirect('/users/sign-in');

      });
    }
    else {
      return res.redirect('back');
    }

  });




}
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render('profile', {

      title: "Codial | Profile",
      profile_user: user
    });
  });

}
module.exports.createSession = function (req, res) {
  req.flash('success', 'logged in successfully');
  //here we are setting the key value pairs as success being the key and value being the logged in successfully
  return res.redirect('/');
}



module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'logged out');
  return res.redirect('/');
}
module.exports.update =  async function (req, res) {
  if (req.user.id == req.params.id) {
    try{
      let =await User.findById(req.params.id);
      //we wont be able to get req.body as usual as body parser is not able to parse multipart form
      //so multer makes a way for us

      // as uploadedAvatar calls multer
      //multer gets the form data through uploadedAvatar function and parses it  send the file to the destination and filename
     await User.uploadedAvatar(req,res,function(err){
        if(err){
          console.log('*********multer error',err);
        }
        console.log('file',req.file);
        console.log('body',req.body);
      });

    }catch(err){
      console.log('*******error in multer',err);
      return res.redirect('back');
    }
  } else {
    return res.status(401).send('unauthorized');
  }

}