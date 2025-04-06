import axios, { AxiosInstance } from 'axios';
// Remove getSession import as NextAuth is disabled
// import { getSession } from 'next-auth/react';

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
            // Remove getSession logic
            // const session = await getSession();
            // console.log('HttpService:::session:::', session);
            // const token = session?.user?.accessToken;

            // Directly get token from localStorage
            const tokenLocalStorage = localStorage.getItem('token');
            console.log('HttpService: Attaching token from localStorage:', tokenLocalStorage ? 'Found' : 'Not Found');

            if (tokenLocalStorage) { // Use only localStorage token
                config.headers['Authorization'] = `Bearer ${tokenLocalStorage}`;
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