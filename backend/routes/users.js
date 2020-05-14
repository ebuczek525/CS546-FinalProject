const express = require('express');
const router = express.Router();
const users = require('../data/dataUsr');

router.get('/', (req, res) => {
    
    if(!req.session.user) {
        res.sendFile('home.html', { root: './' })
        } else {
        return res.redirect('/public/index.html');
        }
});

router.post('/login', async (req, res) => {
    let user = JSON.stringify(req.body.username).replace(/"/g, "");
    let pass = JSON.stringify(req.body.password).replace(/"/g, "");

    const validLogin = await authenticate(user, pass);

    if (validLogin === false) {
        res.set('Content-Type', 'text/html');
        res.send('<html><head><title>Bad Login Attempt</title></head><body><p>You did not provide a valid username and/or password.</p><a href="/">Click here to return to the login page.</a></body></html>').status(401);
        return;
    }

    req.session.user = validLogin.username;
    req.session.users = validLogin;
    res.redirect('/public/index.html');
});

const authenticate = async (user, pass) => {
    const checkUsr = await users.checkUsr(user, pass);
    return checkUsr;
};

module.exports = router;
