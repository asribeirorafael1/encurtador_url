const UrlsController = require('./urls.controller');
const AuthService = require('../auth/auth.service');

module.exports = (app) => {
    app.post('/encurtador', UrlsController.shorten);
    app.get('/:idEncurtado', UrlsController.unshorten);
};
