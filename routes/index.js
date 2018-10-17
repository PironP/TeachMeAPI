'use strict';

const express = require('express');
const config = require('../config');

const RouteManager = function() { };

RouteManager.attach = function(app) {
    app.use('/', express.static(config.api.dir));
};

module.exports = RouteManager;
