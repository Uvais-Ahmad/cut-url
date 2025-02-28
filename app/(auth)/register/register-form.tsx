"use client"
import { register } from '@/actions/auth'
import { useActionState } from 'react'

export function RegisterForm() {
    const [formState, formAction ] = useActionState(register, undefined);
    return (
        <form action={formAction} method="post">
        <h1>Register</h1>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Name" />
        </div>
        {formState?.errors?.name && <p>{formState.errors.name}</p>}
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        {formState?.errors?.email && <p>{formState.errors.email}</p>}
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
        </div>
        {formState?.errors?.password && (
            <div>
                <p>Password must:</p>
                <ul>
                    {formState.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                    ))}
                </ul>
            </div>
        )}
        <button type="submit">Sign Up</button>
        </form>
    )
}