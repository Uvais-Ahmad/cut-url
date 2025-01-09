const getFaviconUrl = (websiteUrl: string) => {
    try {
        const url = new URL(websiteUrl);
        return `${url.origin}/favicon.ico`;
    } catch (error) {
        console.error("Invalid URL:", websiteUrl);
        return null;
    }
};

export default getFaviconUrl;