const APIService = require('../../../server/services/api/api.service');
const UsersModel = require('../users/users.model');
const HashService = require('../../../server/services/hash/hash.service');
const TokenService = require('../../../server/services/token/token.service');
const OptionsUpdate = {new: true};

module.exports = {
    login: login,
    signup: signup,
    forgetPassword: forgetPassword
};

// login ---

function login(req, res) {

    if (!req.body.username) {
        return APIService.error(res, {});
    }

    if (!req.body.senha) {
        return APIService.error(res, {});
    }

    //noinspection JSUnresolvedFunction
    UsersModel
        .find({
            username: req.body.username.trim().toUpperCase()
        })
        .lean()
        .exec(_onFindUserByUsername(req, res));
}

function _onFindUserByUsername(req, res) {
    return (ErrorFindUserByUsername, Users) => {
        if (ErrorFindUserByUsername) {
            return APIService.error(res, ErrorFindUserByUsername);
        }

        if (Users.length > 1) {
            return APIService.error(res, {});
        }

        if (!Users.length) {
            return APIService.error(res, {});
        }

        const User = Users[0];

        if (!HashService.validate(req.body.senha, User.senha)) {
            // Same code error (205)
            return APIService.error(res, {});
        }

        const ObjectToken = {
            _id: User._id
        };
        const token = TokenService.create(ObjectToken);
        const ObjectAuth = {
            token: token,
            permission: User.permission,
            user: User._id
        };

        return APIService.success(res, ObjectAuth);
    };
}

// signup ---

function signup(req, res) {
    let NewUser = req.body;

    NewUser.permission = 3;

    if (!NewUser.username) {
        return APIService.error(res, {});
    }

    if (!NewUser.senha) {
        return APIService.error(res, {});
    }

    //noinspection JSUnresolvedFunction
    UsersModel
        .find({
            hash_username: NewUser.username.trim().toUpperCase()
        })
        .lean()
        .exec(_onFindUsersExistentByUsername(req, res, NewUser));
}

function _onFindUsersExistentByUsername(req, res, NewUser) {
    return (ErrorFindUsersExistentByUsername, Users) => {
        if (ErrorFindUsersExistentByUsername) {
            return APIService.error(res, ErrorFindUsersExistentByUsername);
        }

        if (Users.length > 1) {
            return APIService.error(res, {});
        }

        if (Users.length) {
            return APIService.error(res, {});
        }

        NewUser.senha = HashService.create(NewUser.senha);

        NewUser = new UsersModel(NewUser);

        //noinspection JSUnresolvedFunction
        NewUser.save(_onAddUser(res));
    }
}

function _onAddUser(res) {
    return function (ErrorSaveUser, UserSaved) {
        if (ErrorSaveUser) {
            return APIService.error(res, ErrorSaveUser);
        }

        return APIService.success(res, UserSaved);
    };
}


function forgetPassword(req, res){

    if (! req.body.username) {
        return APIService.error(res, {});
    }

    //noinspection JSUnresolvedFunction
    UsersModel
        .find({
            username: req.body.username.trim()
        })
        .lean()
        .exec(_onFindUserExistentByUsername(req, res));
}

function _onFindUserExistentByUsername(req, res) {
    return (ErrorFindUserExistentByUsername, Users) => {
        if (ErrorFindUserExistentByUsername) {
            return APIService.error(res, ErrorFindUserExistentByUsername);
        }

        let User = Users[0];

        var UserEdited = {
            $set: {
                reset_senha: true
            }
        };

        UsersModel
            .findByIdAndUpdate(User._id, UserEdited, OptionsUpdate)
            .lean()
            .exec(_onForgetPassword(res));
    };
}

function _onForgetPassword(res) {
    return function (ErrorForgetPassword, ForgetPasswordEdited) {
        if (ErrorForgetPassword) {
            return APIService.error(res, ErrorForgetPassword);
        }

        return APIService.success(res, ForgetPasswordEdited);
    };
}