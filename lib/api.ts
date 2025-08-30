import { ShortUrlsProps } from "@/types";
import axiosInstance from "./axiosInstance";
import { TRegisterFormSchema } from "./types";
import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiResponse<T = unknown> {
    status: number;
    data?: T;
    message?: string;
    errors?: Record<string, string | string[]>;
}

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
interface Data {
    shortUrls: ShortUrlsProps[];
}
export const getShortUrl = async () => {
    return axiosFetchUrl<{data: Data}>('/api/shorten', {
        method: 'GET'
    });
}

export async function handleRegister(data: TRegisterFormSchema): Promise<ApiResponse> {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            status: response.status,
            data: response.data,
            message: response.data.message,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                status: error.response?.status || 500,
                data: error.response?.data,
                message: error.response?.data?.message || 'Registration failed',
                errors: error.response?.data?.errors,
            };
        }
        
        return {
            status: 500,
            message: 'Network error occurred',
        };
    }
}

export async function handlePasswordReset(email: string): Promise<ApiResponse> {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
        
        return {
            status: response.status,
            message: response.data.message,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Password reset failed',
            };
        }
        
        return {
            status: 500,
            message: 'Network error occurred',
        };
    }
}

export const handleGetME = async() => {
    return axiosInstance('/api/me');
}