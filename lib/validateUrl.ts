export default function validateUrl(originalUrl: string) {
    originalUrl = originalUrl.trim();
    try {
        const validUrl = new URL(originalUrl);
        return validUrl;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}