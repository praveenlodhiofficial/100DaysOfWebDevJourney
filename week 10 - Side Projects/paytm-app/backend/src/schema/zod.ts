import { z } from 'zod'

const signup = z.object ({
    username: z.string().min(5, 'Username is required').max(50, 'Username is too long.'),
    firstname: z.string().min(2, 'Firstname is required').max(50, 'Firstname is too long.'),
    lastname: z.string().min(2, 'Lastname is required').max(50, 'Lastname is too long.'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signin = z.object ({
    username: z.string().min(5, 'Username is required').max(50, 'Username is too long.'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export { signup, signin }