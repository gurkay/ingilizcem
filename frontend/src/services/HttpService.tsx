import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

class HttpService {
    private static instance: HttpService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://ingilizcem.net',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.axiosInstance.interceptors.request.use(async (config) => {
            const session = await getSession();
            console.log('HttpService:::session:::', session);
            const token = session?.user?.accessToken;
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
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