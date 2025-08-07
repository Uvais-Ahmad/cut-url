export * from './urls';
export * from './auth';

export interface ShortUrlsProps {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
    updatedAt: string;
    clicks: number;
    active: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string | string[]>;
}