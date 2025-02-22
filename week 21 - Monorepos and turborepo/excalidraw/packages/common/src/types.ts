import { z } from 'zod'

export const CreateUserSchema = z.object ({
    name: z.string().min(3).max(50),
    username: z.string().min(3).max(50),
    password: z.string(),
})

export const SignInSchema = z.object ({
    username: z.string().min(3).max(50),
    password: z.string(),
})

export const CreateRoomSchema = z.object ({
    name: z.string().min(3).max(50)
})