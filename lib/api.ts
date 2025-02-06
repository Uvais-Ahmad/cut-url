import axiosInstance from "./axiosInstance";

export const axiosFetchUrl = async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await axiosInstance({
            url,
            method: options?.method || 'GET',
            data: options?.body
        })
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw new Error(`API Error: ${error}`);
    }
}

export const createShortUrl = async (originalUrl: string) => {
    return axiosFetchUrl<{shortUrl: string}>('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({originalUrl})
    })
}

export const getShortUrl = async () => {
    return axiosFetchUrl<{shortUrl: string}>('/api/shorten');
}