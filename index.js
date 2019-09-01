const express = require('express');
// const routes = require('./routes/index');
const app = express();
const cookieParser = require('cookie-parser');
//express does not create session by itself  express-session(it is a middleware)does that
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const sassMiddleware = require('node-sass-middleware');

const mongoStore = require('connect-mongo')(session);
app.use(cookieParser());
app.use(express.urlencoded());
app.use(sassMiddleware(
  {

    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
  }
));
app.use(express.static('./assets'));
const layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(layouts);
app.use(express.static('./assests'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');
// here we are setting up the cookie for the session created
app.use(session({
  name: 'codial',
  secret: 'blahsomthing',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }, store: new mongoStore(
    {
      mongooseConnection: db,
      autoRemove: 'disbaled'
    }
  )
},

));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// routes should be placed after the initialise otherwise middleware in routes wont work and give the error
app.use('/', require('./routes'));
const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running in the server:${err}`);
  }

});
