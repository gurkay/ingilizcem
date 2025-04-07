import axios from "axios";
import HttpService from "./HttpService";

const GenerateTextService = {
    getPrompt: async (prompt: string) => {
        const response = await axios.post('/api/generate', {
            body: prompt
        }, {
            headers: {
                'Content-type': 'application/json'
            }
        });
        return Promise.resolve(response.data);
    },

    googleAi: async (prompt: string) => {
        const response = await HttpService.getAxiosInstance().post(
            `/api/googleAi/generate`,
            {
                body: prompt
            }
        );
        console.log('GenerateTextService:::response:::', response);
        return response.data;
    }
}

export default GenerateTextService;