import { createSlice } from "@reduxjs/toolkit";
import { generateTextExtraReducers } from "./generateTextExtraReducers";
import { IQuestion } from "@/interfaces/IRedux";

interface IinitialState {
    loading: boolean,
    error: null | string,
    output: any | null,
    translate?: string | null,
    story?: string | null,
    quiz?: string | null,
}

const initState: IinitialState = {
    loading: false,
    error: null,
    output: null,
    translate: null,
    story: null,
    quiz: null,
}

export const generateTextSlice = createSlice({
    name: "generateText",
    initialState: initState,
    reducers: {
        setStory: (state, action) => {
            state.story = action.payload;
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        }
    },
    extraReducers: (builder) => {
        generateTextExtraReducers.builderGetPrompt(builder);
        generateTextExtraReducers.builderGetTranslateFromEnglish(builder);
        generateTextExtraReducers.builderGetStoryQuiz(builder);
    }
});

export const { setStory, setQuiz } = generateTextSlice.actions;
export default generateTextSlice.reducer;