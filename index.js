'use strict';

const express = require('express');
const ModelIndex = require('./models');
const RouteManager = require('./routes');
const config = require('./config');


_startServer();

// INTERNAL

function _startServer() {
    const app = express();

    RouteManager.attach(app);

    app.listen(config.api.port, function() {
        console.log('Server started on ' + config.api.port + '...');
    });
}
