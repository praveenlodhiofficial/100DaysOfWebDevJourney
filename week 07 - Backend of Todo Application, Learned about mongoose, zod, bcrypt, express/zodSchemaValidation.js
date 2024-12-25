const { z } = require('zod')

const signupSchema = z.object({
    name: z.string().min(1, 'Name is required.').max(100, 'Name can not be longer than 100 words.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.')
})

const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const todoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    isDone: z.boolean().optional(),
});

module.exports = {
    signupSchema,
    signinSchema,
    todoSchema,
};