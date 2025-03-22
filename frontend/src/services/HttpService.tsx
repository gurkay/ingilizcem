import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

class HttpService {
    private static instance: HttpService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        // Get API URL from environment variables or use a default
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        console.log('Initializing HttpService with API URL:', apiUrl);
        
        this.axiosInstance = axios.create({
            baseURL: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: false // Set to false for cross-origin requests with JWT
        });

        this.axiosInstance.interceptors.request.use(async (config) => {
            try {
                const session = await getSession();
                const token = session?.user?.accessToken;
                
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                
                // Only add standard headers, not CORS headers
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                
                return config;
            } catch (error) {
                console.error('Error in request interceptor:', error);
                return config;
            }
        }, (error) => {
            return Promise.reject(error);
        });
        
        // Add response interceptor to handle common errors
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    console.error('API Error:', error.response.status, error.response.data);
                    
                    // Handle specific error codes
                    if (error.response.status === 403) {
                        console.error('Access forbidden - CSRF or Authentication issue');
                    } else if (error.response.status === 401) {
                        console.error('Unauthorized - Token may be invalid');
                        // Potentially redirect to login page
                    } else if (error.response.status === 502) {
                        console.error('Bad Gateway - Backend server might be down or incorrectly configured');
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Network Error - No response received:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Request Error:', error.message);
                }
                return Promise.reject(error);
            }
        );
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