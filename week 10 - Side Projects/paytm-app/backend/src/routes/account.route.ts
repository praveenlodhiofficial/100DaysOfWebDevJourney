import { authMiddleware } from '@src/middleware/user.middleware'
import { AccountModel } from '@src/schema/db'
import express from 'express'
const  accountRouter = express.Router()

// ------------------------------------>

accountRouter.get("/balance", authMiddleware, async (req: any, res: any) => {
    const account = await AccountModel.findOne ({
        userId: req.userId
    })

    res.json {
        balance: account.balance
    }
})

// ------------------------------------>

export {accountRouter}