'use strict';

const express = require('express');
const models = require('./models');
const routes = require('./routes');
const config = require('./config');


_startServer();

// INTERNAL

function _startServer() {

    const app = express();

    //RouteManager.attach(app);

    app.listen(8080, function() {
        console.log('Server started on ' + 8080 + '...');
    });
}
