import { register } from '@/actions/auth'
import { useActionState } from 'react'

export function RegisterForm() {
    const [state, action, pending ] = useActionState(register, undefined);
    return (
        <form action={register} method="post">
        <h1>Sign Up</h1>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
            <div>
                <p>Password must:</p>
                <ul>
                    {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                    ))}
                </ul>
            </div>
        )}
        <button type="submit">Sign Up</button>
        </form>
    )
}