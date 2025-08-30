"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { toast } from 'sonner';
import LogInForm from "./login-form";

function LoginPageContent() {
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            let errorMessage = 'Authentication failed';
            switch (error) {
                case 'google':
                    errorMessage = 'Google OAuth configuration error. Please check your credentials.';
                    break;
                case 'OAuthCallback':
                    errorMessage = 'OAuth callback error. Please try again.';
                    break;
                case 'Signin':
                    errorMessage = 'Sign-in error. Please try again.';
                    break;
                default:
                    errorMessage = `Authentication error: ${error}`;
            }
            toast.error(errorMessage);
        }
    }, [searchParams]);

    return (
        <div className="min-h-svh flex flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-lg">
                <LogInForm />
            </div>
        </div>
    );
}

export default function LogInPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent />
        </Suspense>
    );
}