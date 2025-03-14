import { RegisterForm } from "./register-form";

export default function Register() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-lg">
                <RegisterForm />
            </div>
        </div>
    )
}