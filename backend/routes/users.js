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
        res.send('You did not provide a valid username and/or password.').status(401);
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
