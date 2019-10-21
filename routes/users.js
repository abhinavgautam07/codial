const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

//in line 7 the middleware is just checking that user is authenticated or not.
router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.post('/update/:id', passport.checkAuthentication,usersController.update);
router.get('/sign-out',usersController.destroySession);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.createUser);

//here the passport is authenticating the user i.e first uses the local strtaegy to authenticate
//in local strategy what it does that it first receives email in the usernameField and the password and then
//find the user. if error or password doesnot match occurs the failureRedirect is called using done(err) or 
//done(null,false). if the user is found it is sent to serializer which stores the user id in session cookie.
//after that passport-session data is sent to deserializer which sets the req.user(it contains all detais of
// autenticated user from the database).

//this whole process is done authenticating the user. that is why we need to login (or authenticate) again 
//if the cookie get expired as the authentication involves storing into cookies.

//Also during authentication process, passport puts a method isAuthenticated on the req in one of the middleware
//and once cookie gets expired the isAuthenticated is set to false  and req.user also gets removed.
//
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
module.exports = router;