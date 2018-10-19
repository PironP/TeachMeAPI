const jwt = require('jsonwebtoken');
var config = require('../config');


const verifyToken = function(){};

/**
 * @param email
 * @param password
 * @returns {Promise<T | never>}
 */

verifyToken.parseAuthorization= function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}
verifyToken.getUserId= function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
        try {
            var jwtToken = jwt.verify(token, config.secret);
            if(jwtToken != null)
                userId = jwtToken.userId;
        } catch(err) { }
    }
    return userId;
}

verifyToken.verifyToken = function(athorisation){
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' }).end();
    });
}

verifyToken.generateToken = function(userData){
    return jwt.sign({
            userId: userData.Id_User,
            isAdmin: userData.Admin
        },
        config.secret,
        {
            expiresIn: '1h'
        })
}
module.exports = verifyToken;