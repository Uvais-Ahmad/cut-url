export interface ShortUrlsProps {
    anonUserId?: string;
    clicks: number;
    createdAt: string;
    expiredAt: string | null;
    id: string;
    isExpired: boolean;
    originalUrl: string;
    shortCode: string;
    updatedAt: string;
    userId: string | null;
}

