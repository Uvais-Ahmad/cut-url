export interface ShortUrlsProps {
    anonUserId?: string;
    clicks: number;
    createdAt: string;
    expiredAt: string | null;
    id: string;
    isExpired: boolean;
    originalUrl: string;
    shortCode: string;
    shortUrl?: string;
    updatedAt: string;
    userId: string | null;
    active?: boolean;
}

