const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lodhi'

function authMiddleware(req, res, next) {

    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'User Unauthorized'
                })
            } else {
                req.DecodedData = decoded
                next()
            }
        })
    } else {
        res.status(401).json({
            message: 'User Unauthorized'
        })
    }
}

module.exports = { authMiddleware, JWT_SECRET };