import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

class HttpService {
    private static instance: HttpService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.axiosInstance.interceptors.request.use(async (config) => {
            const session = await getSession();
            console.log('HttpService:::session:::', session);
            const token = session?.user?.accessToken;
            const tokenLocalStorage = localStorage.getItem('token');
            
            if (token || tokenLocalStorage) {
                config.headers['Authorization'] = `Bearer ${token || tokenLocalStorage}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }
        return HttpService.instance;
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

export default HttpService.getInstance();