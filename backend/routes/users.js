const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('../users');

console.log(__dirname);

// router.get('/', (req, res) => {
//     if (req.session.user) {
// 	res.redirect('/public');
//     } else {
//         res.sendFile('home.html', {root: './'});
//     }
// });

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
    res.redirect('/public');
});

// router.get('/public', (req, res) => {
//     if (!req.session.user) {
//         res.status(403).send('You are not logged in.');
//     } else {
// 	return router.use('/public', express.static(__dirname + '/public'));
	
//     }
// });

// router.get('/logout', (req, res) => {
//     req.session.destroy();
//     res.render('templates/logout.handlebars');
// });

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
