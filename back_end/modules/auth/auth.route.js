module.exports = (app) => {
    const AuthController = require('./auth.controller');

    app.post('/auth/login', AuthController.login);
    app.post('/auth/signup', AuthController.signup);
    app.post('/auth/forgetpassword', AuthController.forgetPassword);
};