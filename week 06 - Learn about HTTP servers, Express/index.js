const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json())
const users = []
const JWT_SECRET = 'lodhi'

app.post('/signup', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })

    res.send({
        username,
        password,
        message: 'You sign-up successfully'
    })

    console.log(users)

})

app.post('/signin', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET)

        user.token = token;

        res.send({
            username,
            token,
            message: 'User sign-in successfully.'
        })

        console.log(users)

    } else {
        res.status(403).send({
            message: 'Either username or password is incorrect'
        })
    }
})

function authMiddleware (req, res, next) {

    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                res.send({
                    message: 'You are Unauthorized'
                })
            } else {
                req.userDetails = decoded
                next();         //we don't use res.send in middleware as it end the response and next() doesn't work.
            }
        })
    } else {
        res.send({
            message: 'You are Unauthorized'
        })
    }
}

app.get('/me', authMiddleware, (req, res) => {

    const username = req.userDetails.username; // Use req.userDetails from the middleware
    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        res.send({
            username: foundUser.username,
            message: 'You are Authorized',
        });
    } else {
        res.status(404).send({
            message: 'User not found',
        });
    }
});


app.listen(3000, () => {
    console.log('Server Restarted')
})