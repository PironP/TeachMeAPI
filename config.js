'use strict';

var config = {};

//Webservice configuration
config.api = {};
config.api.dir = process.env.APP_DIR || 'C:/Users/Sebremy/Documents/GitHub/TeachMeAPI/';
config.api.port = '8080';

//Database configuration
config.db = {};
config.db.name = 'u414096900_teach';
config.db.login = 'u414096900_troot';
config.db.password = 'rootroot';
config.db.host = 'sql133.main-hosting.eu';
config.db.dialect = 'mysql';
config.db.port = '3306';

module.exports = config;
