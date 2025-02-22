import express, { Router } from 'express';
import { authMiddleware } from '../middleware/middleware';

const appRouter: Router = express.Router();

// ------------------------------------------------------->

appRouter.post('/signup', (req, res) => {

});

appRouter.post('/signin', (req, res) => {

});

appRouter.post('/room', authMiddleware, (req, res) => {

});

// ------------------------------------------------------->

export { appRouter };
