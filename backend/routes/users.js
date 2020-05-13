const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('../users');

router.get('/', (req, res) => res.sendFile('home.html', { root: './' }));

router.post('/login', async (req, res) => {
    let user = JSON.stringify(req.body.username).replace(/"/g, "");
    let pass = JSON.stringify(req.body.password).replace(/"/g, "");

    const validLogin = await authenticate(user, pass);

    if (validLogin === false) {
        res.set('Content-Type', 'text/html');
        res.send(new Buffer('<html><head><title>Bad Login Attempt</title></head><body><p>You did not provide a valid username and/or password.</p><a href="/">Click here to return to the login page.</a></body></html>')).status(401);
        return;
    }

    req.session.user = validLogin.username;
    req.session.users = validLogin;
    res.redirect('/public/index.html');
});

const authenticate = async (user, pass) => {
    for (let id of users) {
        if (user === id.username) {
            if (await bcrypt.compare(pass, id.hashedPassword)) {
                return id;
            }
        }
    }
    return false;
};

module.exports = router;
