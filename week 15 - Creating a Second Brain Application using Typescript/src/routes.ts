import express from 'express'
import mongoose from 'mongoose'

const appRouter = express.Router()

// ----------------------------------------------------------> ROUTES

appRouter.post('/signup', async (req, res) => {
    res.json({
        message: 'Signup working'
    })
}) 

appRouter.post('/signin', async (req, res) => {
    res.json({
        message: 'Signin working'
    })
}) 

// ----------------------------------------------------------> EXPORT ROUTES

export { 
    appRouter,
}