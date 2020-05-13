const userRoutes = require('./users');
const dbRoutes = require('./AccessDB');
const linguaRoutes = require('./lingua');

const constructorMethod = (app) => {
    app.use('/db', dbRoutes);
    app.use('/lingua', linguaRoutes);
    app.use('/', userRoutes);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;
