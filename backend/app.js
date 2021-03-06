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

app.use('/public/build/:file', (req, res, next) => {
    if(req.session.user) {
	return res.sendFile(req.params.file, { root: __dirname + '/public/build' });
    } else {
	return res.redirect('/');
    }
});


app.use('/public/:file', (req, res, next) => {
    if(req.session.user) {
	return res.sendFile(req.params.file, { root: __dirname + '/public' });
    } else {
	return res.redirect('/');
    }
});

app.use('/me', (req, res, next) => {
    if(req.session.user) {
	return res.send(req.session.user);
    } else {
    res.set('Content-Type', 'text/html');
    return res.send('<html><head><title>Bad Login Attempt</title></head><body><p>Forbidden. You are not authenticated.</p><a href="/">Click here to return to the login page.</a></body></html>').status(403);
    }
});

app.use('/login', (req, res, next) => {
    if(!req.session.user) {
	req.method = 'POST';
	return next();
    } else {
	return res.redirect('/public/index.html');
    }
});

configRoutes(app);

app.listen(3000, () => {
  console.log('Your routes will be running on http://localhost:3000');
});
