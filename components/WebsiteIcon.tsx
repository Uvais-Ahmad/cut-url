import getFaviconUrl from '@/lib/getFavicon';
import Image from 'next/image';

interface WebsiteIconProps {
    websiteUrl: string;
}

const WebsiteIcon = ({ websiteUrl }: WebsiteIconProps) => {
    const faviconUrl = getFaviconUrl(websiteUrl);

    if (!faviconUrl) return <p>Invalid URL</p>;

    return (
        <Image
            src={faviconUrl}
            alt="Website Icon"
            width={32}
            height={32}
            onError={(e) => (e.currentTarget.src = '/fallback-icon.png')} // Fallback if icon fails
        />
    );
};

export default WebsiteIcon;
