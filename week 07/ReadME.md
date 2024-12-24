## User '/SignIn', '/SignUp', '/me' using 'Stateful Token' for authentication

```
const express = require('express')
const app = express();

app.use(express.json());
const users = [];

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post('/signup', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })

    res.send({
        message: 'You have sign-up successfully.'
    })


    console.log('New user signed up:', { username, password });
    console.log('All users:', users);

})

app.post('/signin', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        const token = generateToken();
        user.token = token;

        res.send({
            username,
            token
        })
    } else {
        res.send({
            message: 'Invalid username or password.'
        })
    }
    console.log(users)

})

app.get('/me', (req, res) => {
    const token = req.headers.token;
    let foundUser = users.find(user => user.token === token);

    if (foundUser) {
        res.send({
            username: foundUser.username,
            password: foundUser.password
        })
    } else {
        res.send({
            message: 'User not found / Unauthorized'
        })
    }
})

app.listen(3000, () => {
    console.log('Server Restarted')
})
```


## User '/SignIn', '/me' Endpoint using 'Stateless JWTs' for Encoding

- #### For '/sign-in' endpoint use: ```jwt.sign``` 

    ```
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = 'lodhi'

    app.post('/signin', (req, res) => {

        const username = req.body.username;
        const password = req.body.password;

        const user = users.find(user => user.username === username && user.password ===password)

        if (user) {
            const token = jwt.sign({
                username: user.username
            }, JWT_SECRET);

            user.token = token;

            res.send({
                username,
                token,
                message: 'User Signed-In successfully.'
            })

            console.log(users)
            
        } else {
            res.status(403).send({
                message: 'Incorrect username or password / UnAuthorized'
            })
        }
    })
    ```

- #### For '/me' endpoint use: ```jwt.verify``` 

    ```
        app.get('/me', (req, res) => {
            const token = req.headers.authorization;

            const userDetails = jwt.verify(token, JWT_SECRET)
            const username = userDetails.username

            const foundUser = users.find(user => username === userDetails.username)

            if (foundUser) {
                res.send({
                    username: foundUser.username
                })
            } else {
                res.status(401).send({
                    message: 'User not found / UnAuthorized'
                })
            }

        })

        app.listen(3000, () => {
            console.log('Server Restarted');  
        })
    ```



## Creation of a 'Auth-Middleware'

- I have created a 'authMiddleware' and passed in below Endpoints such as ('/me')

- #### Redundant res.send in authMiddleware:

    - The middleware sends a response with message: 'User successfully verified.', which ends the response cycle and makes the subsequent call to next() ineffective.

    - Middleware should not send a response unless there is an error (e.g., unauthorized).

    - Even though res.send ends the response, the next() call remains, leading to potential conflicts or unintended behavior.

- #### Auth Middleware :
        
    ```
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
    ```

- #### '/me' Endpoint :
 
    ```
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

    ```


## Creating Schema for the Database using 'mongoose'

```
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema ({
    name: String,
    email: String,
    password: String,
})

const Todo = new Schema ({
    UserId: ObjectId,
    title: String,
    isDone: Boolean,
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo)

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}
```