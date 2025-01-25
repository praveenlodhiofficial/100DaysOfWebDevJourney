import express from 'express';
import { pgClient } from './config/dbClient';

const appRouter = express.Router();

// ---------------------------------------->
appRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const signupQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
        await pgClient.query (signupQuery, [username, email, password]);

        res.json({
            message: 'You have Signed Up'
        });

    } catch (error) {

        res.status(500).json({
            error: 'An error occurred while signing up.'
        });
    }
});
// ---------------------------------------->

export { appRouter };
