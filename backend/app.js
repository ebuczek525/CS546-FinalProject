const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.use('/public', (req, res, next) => req.session.user?
	next() : res.redirect('/'));

app.use('/login', (req, res, next) => {
    if(!req.session.user) {
	req.method = 'POST';
	return next();
    } else {
	return res.redirect('/public');
    }
});

configRoutes(app);

app.listen(3000, () => {
  console.log('Your routes will be running on http://localhost:3000');
});
