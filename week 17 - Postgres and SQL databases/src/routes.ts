import express, { response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { pgClient } from './config/dbClient';

const appRouter = express.Router();

// ---------------------------------------->

appRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password, city, country, street, pincode } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        // --------------> TRANSACTION BEGIN
        await pgClient.query('BEGIN;') 

        const userQuery = await pgClient.query (`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`, [username, email, hashedPassword])
        const user_Id = userQuery.rows[0].id
        const addressesQuery = await pgClient.query (`INSERT INTO addresses (city, country, street, pincode, user_Id) VALUES ($1, $2, $3, $4, $5)`, [city, country, street, pincode, user_Id])

        await pgClient.query('COMMIT;') 
        // --------------> TRANSACTION COMMIT

        res.json({
            message: 'You have Signed Up'
        });

    } catch (error) {

        console.error(error)
        res.status(500).json({
            error: 'An error occurred while signing up.'
        });
    }
});

appRouter.post('/signin', async (req, res) => {

    try {
        const { username, password } = req.body;
        const doesUserExist = await pgClient.query('SELECT * FROM users WHERE username = $1', [username]);

        if (doesUserExist.rows.length === 0) {
            res.json({
                message: 'User does not exist in the database'
            })
        }

        const user = doesUserExist.rows[0]
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (isPasswordMatch) {
            const token = jwt.sign({
                id: user.id
            }, 'JWT_SECRET_TOKEN')

            res.json({
                token,
                message: 'You have Signed In'
            })

        } else {

            res.json({
                message: 'Credentials wrong'
            })
        }

    } catch (error) {

        res.json({
            message: 'Unable to proceed Signed In process'
        })

    }
})

appRouter.get('/metadata', async (req, res) => {
    const id = req.query.id         // url: api/v1/metadata?id=12

    const metadata = await pgClient.query (
        `SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.pincode, addresses.street 
        FROM users FULL JOIN addresses ON users.id = addresses.user_id WHERE users.id = $1; `,
        [id]

        // inner join - dono table m entry present hogi tabhi fetch karna
        // 
    )

    res.json ({
        response: metadata.rows
    })
})

// ---------------------------------------->

export { appRouter };
