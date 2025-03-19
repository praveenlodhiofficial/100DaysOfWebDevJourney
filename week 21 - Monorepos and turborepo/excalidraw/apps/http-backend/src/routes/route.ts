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

appRouter.post('/create-room', authMiddleware, async (req, res) => {
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
        // Check if room with this slug already exists
        const existingRoom = await prismaClient.room.findUnique({
            where: {
                slug: parsedData.data.slug
            }
        });

        if (existingRoom) {
            res.status(409).json({
                message: 'Room with this slug already exists',
                existingRoomId: existingRoom.id
            });
            return;
        }

        // If room doesn't exist, create it
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
});

appRouter.get('/chats/:roomId', async (req, res) => {
    try {
        // Validate and parse roomId
        const roomId = Number(req.params.roomId);

        // Check if room exists
        const room = await prismaClient.room.findUnique({
            where: { id: roomId },
        });

        if (!room) {
            res.status(404).json({
                success: false,
                message: 'Room not found',
            });
            return;
        }

        // Get messages with additional useful fields
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId,
            },
            orderBy: {
                id: 'desc', // Changed to createdAt for better clarity
            },
            take: 1000,
        });

        res.status(200).json({
            success: true,
            data: {
                roomId,
                messages: messages,
                count: messages.length,
            },
            message: 'Messages retrieved successfully',
        });

    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: (error as any).message,
        });
    }
});

appRouter.get('/room/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });

        if (!room) {
            res.status(404).json({
                error: 'Room not found'
            });
            return
        }

        res.status(200).json({
            room
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });

    }
});

// ------------------------------------------------------->

export { appRouter };
