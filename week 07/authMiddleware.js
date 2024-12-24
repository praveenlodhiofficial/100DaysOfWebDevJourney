const jwt = require('jsonwebtoken')
const JWT_SECRET = 'lodhi'

function authMiddleware(req, res, next) {

    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (err) {
                res.json({
                    message: 'User not recognized'
                })
            } else {
                req.DecodedData = decode;
                next();
            }
        })
    } else {
        res.json({
            message: 'User not recognized'
        })
    }
}

module.exports = { authMiddleware, JWT_SECRET };