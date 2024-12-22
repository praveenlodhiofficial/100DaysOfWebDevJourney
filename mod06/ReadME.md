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


## User '/SignIn', '/SignUp', '/me' using 'Stateless JWTs' for Encoding

- for '/sign-in' endpoint use: ```jwt.sign``` 
- for '/me' endpoint use: ```jwt.verify``` 

```
//Encoding using JWTs

const express = require('express')
const app = express()                       
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
        message: 'You Sign-Up successfully'
    })

    console.log(users);
    
})

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