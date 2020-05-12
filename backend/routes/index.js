const userRoutes = require('./users');
const dbRoutes = require('./AccessDB');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/db', dbRoutes);

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;