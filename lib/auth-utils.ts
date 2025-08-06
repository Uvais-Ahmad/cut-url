export function getAuthErrorMessage(error: string | AuthError): string {
    if (typeof error === 'string') {
        switch (error) {
            case 'CredentialsSignin':
                return 'Invalid email or password. Please try again.';
            case 'EmailSignin':
                return 'Unable to send email. Please try again.';
            case 'OAuthSignin':
                return 'Error with OAuth provider. Please try again.';
            case 'OAuthCallback':
                return 'Error in OAuth callback. Please try again.';
            case 'OAuthCreateAccount':
                return 'Could not create OAuth account. Please try again.';
            case 'EmailCreateAccount':
                return 'Could not create account. Please try again.';
            case 'Callback':
                return 'Error in callback. Please try again.';
            case 'OAuthAccountNotLinked':
                return 'Account not linked. Please sign in with your original provider.';
            case 'EmailSigninRateLimit':
                return 'Too many attempts. Please wait before trying again.';
            case 'SessionRequired':
                return 'Please sign in to continue.';
            default:
                return 'An authentication error occurred. Please try again.';
        }
    }
    
    return 'An unexpected error occurred. Please try again.';
}

export function validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[a-zA-Z]/.test(password)) {
        errors.push('Password must contain at least one letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push('Password should contain at least one special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors,
    };
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
