'use strict';

const express = require('express');
const config = require('../config');

const RouteManager = function() { };

RouteManager.attach = function(app) {
    app.use('/', express.static(config.api.dir));
    app.use('/deposit', require('./deposit'));
    app.use('/product', require('./product'));
    app.use('/category', require('./category'));
    app.use('/users', require('./user'));
};

module.exports = RouteManager;

