const Post = require('../models/post_schema');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/users_schema');
module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 25);

  // Post.find({}, function(err, posts){
  //     return res.render('home', {
  //         title: "Codeial | Home",
  //         posts:  posts
  //     });
  // });

  // populate the user of each post
  // Post.find({}).populate('user').exec(function (err, posts) {
  //   return res.render('home',{
  //       title:"codial | home",
  //       posts:posts
  //   });

  // });
  //populating comment as well
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });
      


    let users = await User.find({});

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
    });





  } catch(err){

    console.log('Error',err);
      return res.redirect('back');
  }

}

// module.exports.actionName = function(req, res){}