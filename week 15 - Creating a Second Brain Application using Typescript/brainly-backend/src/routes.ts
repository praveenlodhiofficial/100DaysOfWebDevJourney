import express from 'express'
import bcrypt from 'bcrypt'

const appRouter = express.Router()
const JWT_SECRET = 'user-jwt-secret'

import jwt, { JwtPayload } from 'jsonwebtoken'
import { contentModel, linkModel, userModel } from './db'
import { authMiddleware } from './middleware'
import { random } from './utils'

// ----------------------------------------------------------> ROUTES

appRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = userModel.create({
            username,
            email,
            password: hashedPassword
        })

        res.json({
            username,
            email,
            message: 'signup done successfully.'
        })

    } catch (error) {

        res.json({
            message: 'signup not working.'
        })
    }
})

appRouter.post('/signin', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const doesUserExist = await userModel.findOne({
            $or: [{ email }, { username }],
        })

        if (!doesUserExist) {
            res.json({
                message: 'user does not exist in the database.'
            })
        } 

        if (doesUserExist && doesUserExist.password) {
            const isPasswordMatching = await bcrypt.compare(password, doesUserExist.password)

            if (isPasswordMatching) {
                const token = jwt.sign({
                    id: doesUserExist._id
                }, JWT_SECRET)

                res.json({
                    token,
                    message: 'signin done successfully.'
                })
            }
        }

    } catch (error) {

        res.json({
            message: 'signin not working.'
        })
    }

})

appRouter.post('/content', authMiddleware, async (req: any, res: any) => {
    try {
        const { title, tags, link, type } = req.body;
        const userId = req.userId.id

        const createContent = contentModel.create({
            title,
            tags,
            link,
            type,
            userId: userId
        })

        res.json({
            createContent: { title, tags, link, type },
            message: 'content created successfully.'
        })

    } catch (error) {

        res.json({
            message: 'unable to create content.'
        })
    }
})

appRouter.get('/content', authMiddleware, async (req: any, res: any) => {

    try {
        const userId = req.userId.id

        const fetchContent = await contentModel.find({
            userId: userId
        }).populate({
            path: 'userId',
            select: 'username'
        })

        res.json({
            fetchContent,
            message: 'content fetch successfully'
        })

    } catch (error) {

        res.json({
            message: 'unable to fetch content'
        })

    }
})

appRouter.delete('/content', authMiddleware, async (req: any, res: any) => {
    try {
        const userId = req.userId.id;

        // Delete all content belonging to the user
        const deleteResult = await contentModel.deleteMany({ userId });

        if (deleteResult.deletedCount > 0) {
            res.status(200).json({
                message: 'All content deleted successfully.',
            });
        } else {
            res.status(404).json({
                message: 'No content found for the user.',
            });
        }
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({
            message: 'Unable to delete content.',
        });
    }
});

appRouter.post('/brain/share', authMiddleware, async (req: any, res: any) => {
    try {
        const { share } = req.body;

        if (share) {
            // Check if a link already exists for the user
            const existingLink = await linkModel.findOne({
                userId: req.userId.id,
            });

            if (existingLink) {
                return res.status(200).json({
                    hash: existingLink.hash,
                    message: `Existing sharable link: /share/${existingLink.hash}`,
                });
            }

            // Create a new sharable link
            const hash = random(10);
            await linkModel.create({
                userId: req.userId.id,
                hash,
            });

            return res.status(201).json({
                hash,
                message: `Sharable link created: /share/${hash}`,
            });
        } else {
            // Remove existing sharable link
            await linkModel.deleteOne({
                userId: req.userId.id,
            });

            return res.status(200).json({
                message: 'Sharable link removed.',
            });
        }
    } catch (error) {
        console.error('Error in POST /brain/share:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ----------------------------------------------------------> EXPORT ROUTES

export { appRouter }