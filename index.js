const express = require('express');
const cookieParser = require('cookie-parser');
// const routes = require('./routes/index');
const app = express();
//express does not create session by itself  express-session(it is a middleware)does that
const layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const mongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
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

app.use(layouts);
//make the uploads path available to the browser

// because the img tag searches for the /uploads/users/avatars/avtar-... path so we need to amke this path avialable

// the above static is telling that if there is requirement of any static File,look in assests
// but second one tells tha if you require any static fiel within the /uploads rote look in uploads

app.use('/uploads',express.static('./uploads'));

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
app.use(flash());  //should be used after passport.session as it uses session cookies
app.use(customMware.setFlash);
// routes should be placed after the setAutheticatedUser middleware as it contains next(),otherwise res.user wont get set 

app.use('/', require('./routes'));
const port = 8000;

app.listen(port, function (err) {
	if (err) {
		console.log(`Error in running in the server:${err}`);
	}

});
