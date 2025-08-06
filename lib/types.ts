import { z } from 'zod'

export const RegisterFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .trim(),
    email: z.string()
        .email('Invalid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(255, 'Email must be at most 255 characters')
        .trim(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(255, 'Password must be at most 255 characters')
        .regex(/[a-zA-Z]/,"Password must contain at least one letter")
        .regex(/[0-9]/,"Password must contain at least one number")
        .trim(),
})

export const LogInFormSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .min(1, 'Email is required')
        .trim(),
    password: z.string()
        .min(1, 'Password is required')
        .trim(),
})

export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>
export type TLogInFormSchema = z.infer<typeof LogInFormSchema>