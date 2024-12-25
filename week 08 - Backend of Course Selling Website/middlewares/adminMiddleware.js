const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lodhi'

function userAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {

        if (token) {

            jwt.verify(token, JWT_SECRET, (err, decode) => {
                if (err) {
                    res.json({
                        message: 'User Unauthorized'
                    })
                } else {
                    req.DecodedData = decode;
                    next();
                }
            })

        } else {

            res.json({
                message: 'User Unauthorized'
            })

        }

    } catch (error) {

        res.json({
            message: 'Unable to process authorization process'
        })

    }
}

module.exports = {
    userAuthMiddleware,
    JWT_SECRET
}