import express, { Router } from 'express';
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from '@repo/common/zodTypes'
import { prismaClient } from '@repo/db/prismaClient';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config';
import { authMiddleware } from '../middleware/middleware';

const appRouter: Router = express.Router();

// ------------------------------------------------------->

appRouter.post('/signup', async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            error: parsedData.error.format(),
            message: 'Incorrect Inputs',
        });
        return;
    }

    try {
        // Hashing the password
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        // Create user in the database
        const user = await prismaClient.user.create({
            data: {
                name: parsedData.data.name,
                email: parsedData.data.email,
                password: hashedPassword,
            },
        });

        res.status(200).json({
            name: user.name,
            email: user.email,
            userId: user.id,
            message: 'User created successfully',
        });

    } catch (error) {
        if ((error as any).code === 'P2002') { // Unique constraint violation
            res.status(400).json({
                message: 'Email already exists',
            });
        } else {
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }
});

appRouter.post('/signin', async (req, res) => {
    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            error: parsedData.error.format(),
            message: 'Invalid inputs',
        });
        return;
    }

    try {
        // Find user by email
        const user = await prismaClient.user.findUnique({
            where: {
                email: parsedData.data.email,
            },
        });

        // Check if user exists
        if (!user) {
            res.status(401).json({
                message: 'Invalid email or password',
            });
            return;
        }

        // Compare password
        const isPasswordMatching = await bcrypt.compare(
            parsedData.data.password,
            user.password
        );

        if (!isPasswordMatching) {
            res.status(401).json({
                message: 'Invalid email or password',
            });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET, { expiresIn: '1d' }
        );

        // Successful login response
        res.status(200).json({
            token,
            userId: user.id,
            name: user.name,
            email: user.email,
            message: 'Sign in successful',
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});

appRouter.post('/create-room',authMiddleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            error: parsedData.error.format(),
            message: 'Incorrect Inputs',
        });
        return;
    }

    // @ts-ignore
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.slug,
                adminId: userId,
            },
        });

        res.status(200).json({
            roomId: room.id,
            slug: room.slug,
            message: 'Room created successfully',
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
})


// ------------------------------------------------------->

export { appRouter };
