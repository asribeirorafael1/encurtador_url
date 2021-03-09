const UsersController = require('./users.controller');
const AuthService = require('../auth/auth.service');

module.exports = (app) => {
    app.post('/users/add', AuthService.userLogged, UsersController.add);
    app.post('/users/edit/:userId', UsersController.edit);
    app.get('/users/remove/:userId', AuthService.userLogged, UsersController.remove);
    app.get('/users/getAll', AuthService.userLogged, UsersController.getAll);
    app.get('/users/get/:userId', AuthService.userLogged, UsersController.getUserById);
};
