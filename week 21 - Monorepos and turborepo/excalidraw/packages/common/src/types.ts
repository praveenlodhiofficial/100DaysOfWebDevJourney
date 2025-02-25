import { z } from 'zod'

export const CreateUserSchema = z.object ({
    name: z.string().min(3).max(50),
    email: z.string().min(3).max(50).toLowerCase(),
    password: z.string(),
})

export const SignInSchema = z.object ({
    email: z.string().min(3).max(50).toLowerCase(),
    password: z.string(),
})

export const CreateRoomSchema = z.object ({
    slug: z.string().min(3).max(50)
    
})