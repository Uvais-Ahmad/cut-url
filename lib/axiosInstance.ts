import axios from "axios";
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL

const axiosInstance = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    console.log(`Making request to ${config.url}`);
    return config;
})
export default axiosInstance;