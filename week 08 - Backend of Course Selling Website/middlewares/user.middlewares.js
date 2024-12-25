require('dotenv').config();  // Make sure dotenv is imported first to load environment variables
const jwt = require('jsonwebtoken');
const { userJwtSecret } = require('../config');

function userAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        if (token) {
            jwt.verify(token, userJwtSecret, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        message: 'User Unauthorized' // 401: Unauthorized
                    });
                } else {
                    req.DecodedData = decode;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                message: 'User Unauthorized' // 401: Unauthorized
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to process authorization process' // 500: Internal Server Error
        });
    }
}

module.exports = {
    userAuthMiddleware: userAuthMiddleware
}