module.exports = (app) => {
    require('../../back_end/modules/users/users.route')(app);
    require('../../back_end/modules/urls/urls.route')(app);
};