import { IPaginationParams } from "@/interfaces/IPaginationParams";
import HttpService from "./HttpService";

const LessonService = {
        findByUserId: async (userId: number, params: IPaginationParams) => {
        console.log("LessonService:::findByUserId:::params", params);
        const { page, size, sort } = params;
        
        const queryParams = new URLSearchParams({
            page: params?.page?.toString() || '0',
            size: params?.size?.toString() || '10',
        });

        // Add sort parameters
        params?.sort?.forEach(sortItem => {
            queryParams.append('sort', sortItem);
        });

        const response = await HttpService.getAxiosInstance().get(
            `/api/lessons/findByUserId/${userId}?${queryParams.toString()}`
        );
        console.log("LessonService:::findByUserId:::response", response);
        return response.data;
    },

    findByLessonIdAndSearch: async (lessonId: number, params: IPaginationParams) => {
        const { page, size, sort, searchText } = params;
        
        const queryParams = new URLSearchParams({
            page: params?.page?.toString() || '0',
            size: params?.size?.toString() || '10',
        });

        if (searchText) {
            queryParams.append('searchText', searchText);
        }

        params?.sort?.forEach(sortItem => {
            queryParams.append('sort', sortItem);
        });

        const response = await HttpService.getAxiosInstance().get(
            `/api/lessons/findByLessonId/${lessonId}?${queryParams.toString()}`
        );
        return response.data;
    },

    updateWordStatus: async (lessonWordId: number, status: string) => {
        const response = await HttpService.getAxiosInstance().put(
            `/api/lessons/updateWordStatus/${lessonWordId}?status=${status}`
        );
        return response.data;
    }
}

export default LessonService;