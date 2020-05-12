const userRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/public', require('express').static(__dirname + '/public'));
    app.use('/', userRoutes);
    
    // app.use('*', (req, res) => {
    //     res.redirect('/');
    // });
};

module.exports = constructorMethod;
