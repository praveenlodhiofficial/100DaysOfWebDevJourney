const { USER_JWT_SECRET } = require("../config");

function userAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        if (token) {
            jwt.verify(token, USER_JWT_SECRET, (err, decode) => {
                if (err) {
                    res.json({
                        message: 'User Unauthorized'
                    })
                } else {
                    req.userDetails = decode;
                    next()
                }
            })
        } else {
            res.json({
                message: 'User Unauthorized'
            })
        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed authorization process (user middleware).'
        })

    }
} 

module.exports = {
    userAuthMiddleware
}