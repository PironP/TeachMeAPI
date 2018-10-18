const passwordHash = require('password-hash');
const ModelIndex = require('../models');
const User = ModelIndex.user;

const userController = function(){};

/**
 * @param email
 * @param password
 * @returns {Promise<T | never>}
 */
userController.authotificate = function(email, password){
    return User.findOne({
        where: {
            Email: email,
        }}
    )
        .then (function(user)
    {
        console.log(passwordHash.verify(password, user.Password));
        if (user === undefined || user === null ||!passwordHash.verify(password, user.Password))
        {
            return false;
        }
        return user;
    });
}
/**
 * @param userParam
 * @returns {Promise<T | never>}
 */
userController.signIn = function(userParam){
    return User.findOne({
        where: {
            Email: userParam.email,
        }}
    )
        .then (function(user)
    {
        if (user === undefined || user === null) {
            return User.create({
                Email: userParam.email,
                Password: passwordHash.generate(userParam.password),
                LastName:  userParam.lastName,
                FirstName: userParam.firstName,
                Tel:       userParam.tel
            });
        }
        return false;
    });
}

userController.update = function(userParam){
    return User.findOne({
        where: {
            Email: userParam.email,
        }}
    )
        .then (function(user)
        {
            if (user === undefined || user === null) {
                return User.create({
                    Email: userParam.email,
                    Password: passwordHash.generate(userParam.password),
                    LastName:  userParam.lastName,
                    FirstName: userParam.firstName,
                    Tel:       userParam.tel
                });
            }
            return false;
        });
}
module.exports = userController;
