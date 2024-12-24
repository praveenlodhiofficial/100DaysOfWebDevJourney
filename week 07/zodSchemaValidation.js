const { z } = require('zod');

// Signup schema
const signupSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Signin schema
const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Todo creation schema
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
