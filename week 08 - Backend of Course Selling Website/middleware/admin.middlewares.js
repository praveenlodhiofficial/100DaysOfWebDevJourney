const jwt = require('jsonwebtoken')
const { ADMIN_JWT_SECRET } = require("../config");

function adminAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        if (token) {
            jwt.verify(token, ADMIN_JWT_SECRET, (err, decode) => {
                if (err) {
                    res.json({
                        message: 'Admin Unauthorized'
                    })
                } else {
                    req.adminDetails = decode;
                    next()
                }
            })
        } else {
            res.json({
                message: 'Admin Unauthorized'
            })
        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed authorization process (admin middleware).'
        })

    }
} 

module.exports = {
    adminAuthMiddleware
}