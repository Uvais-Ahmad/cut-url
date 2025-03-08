import LogInForm from "./login-form";

export default function LogInPage () {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-lg">
                <LogInForm  />
            </div>
        </div>
    )
}