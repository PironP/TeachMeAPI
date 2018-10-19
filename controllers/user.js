const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const ModelIndex = require('../models');
const verifyToken =require('./verifyToken')
const User = ModelIndex.user;
var config = require('../config');
// Constants
const EMAIL_REGEX    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const userController = function(){};

/**
 * @param email
 * @param password
 * @returns {Promise<T | never>}
 */
userController.authontificate = function(email, password){
     return User.findOne({
        where: {
            Email: email,
        }}
    )
        .then (function(user){
            console.log(passwordHash.verify(password, user.Password));
            if (user === undefined || user === null ||!passwordHash.verify(password, user.Password))
          {
               return false;
           }
           // create a token
           var token = verifyToken.generateToken(user);
           return ({ userID: user.Id_User, token: token });
         });
};

/**
 * @param userParam
 * @returns {Promise<T | never>}
 */
userController.signIn = function(req, res){
    var userParam = req.body;
    if (!EMAIL_REGEX.test(userParam.email)) {
        return res.status(400).json({ 'error': 'email is not valid' });
    }
    if (!PASSWORD_REGEX.test(userParam.password)) {
        return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
    }
    return User.findOne({
        where: {
            Email: userParam.email,
        }}
    )
        .then (function(user)
    {
        if (user === undefined || user === null) {
            return user = User.create({
                Email:     userParam.email,
                Password:  passwordHash.generate(userParam.password),
                LastName:  userParam.lastName,
                FirstName: userParam.firstName,
                Tel:       userParam.tel,
                Admin:     userParam.admin
            });
        }
        return false;
    });
};

userController.update = function(userParam){
return User.findOne({
    where: {
        Email: userParam.email,
    }})
    .then (function(user) {
        if (user !== undefined || user !== null) {
            const options = {}
            if (userParam.email !== undefined) {
                options.Email = userParam.email;
            }
            if (userParam.password !== undefined) {
                options.Password = userParam.password;
            }
            if (userParam.lastName !== undefined) {
                options.LastName = userParam.lastName;
            }
            if (userParam.firstName !== undefined) {
                options.FirstName = userParam.firstName;
            }
            if (userParam.tel !== undefined) {
                options.Tel = userParam.tel;
            }
            if (userParam.admin !== undefined) {
                options.Admin = userParam.admin;
            }
            return User.update(options, {returning: true, where: {Id_User: user.Id_User}});
        }
        return false;
    });
};

userController.delete = function(userId) {
    return User.findOne({
        where: {
            Id_User: userId,
        }})
            .then(function(user){
                if (user == undefined || user == null) {
                    return false;
                }
                return User.destroy({where: {Id_User: userId}});
            });
};
module.exports = userController;
