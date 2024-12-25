require('dotenv').config();  // Make sure dotenv is imported first to load environment variables
const { adminJwtSecret } = require('../config');
const jwt = require('jsonwebtoken');


function adminAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        if (token) {
            jwt.verify(token, adminJwtSecret, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Admin Unauthorized'
                    });
                } else {
                    req.DecodedData = decode;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                message: 'Admin Unauthorized'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to process authorization process'
        });
    }
}

module.exports = {
    adminAuthMiddleware: adminAuthMiddleware
}