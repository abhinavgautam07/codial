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
module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect('back');

    });
  } else {
    return res.status(401).send('unauthorized');
  }

}