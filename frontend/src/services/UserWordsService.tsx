import { IPaginationParams } from "@/interfaces/IPaginationParams";
import HttpService from "./HttpService";

const UserWordsService = {
    findByUserIdAndStatus: async (userId: number, status: string, params: IPaginationParams) => {
        console.log("LessonService:::findByUserId:::params", params);
        const { page, size, sort } = params;
        
        const queryParams = new URLSearchParams({
            status: status,
            page: params?.page?.toString() || '0',
            size: params?.size?.toString() || '10',
        });

        // Add sort parameters
        params?.sort?.forEach(sortItem => {
            queryParams.append('sort', sortItem);
        });

        const response = await HttpService.getAxiosInstance().get(
            `/api/user-words/findByUserIdAndStatus/${userId}?${queryParams.toString()}`
        );
        console.log("LessonService:::findByUserId:::response", response);
        return response.data;
    }
}

export default UserWordsService;