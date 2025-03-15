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
        .regex(/[a-zA-Z]/,"Contains at least one letter")
        .regex(/[0-9]/,"Contains at least one number")
        .trim(),
})

export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>