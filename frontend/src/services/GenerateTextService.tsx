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
    }
}

export default GenerateTextService;