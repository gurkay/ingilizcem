import { createSlice } from "@reduxjs/toolkit";
import { storyQuestionExtraReducers } from "./storyQuestionExtraReducers";
import { IQuestion } from "@/interfaces/IRedux";

interface IinitialState {
    loading: boolean,
    error: null | string,
    output: IQuestion[],
}

const initState: IinitialState = {
    loading: false,
    error: null,
    output: [],
}

export const storyQuestionSlice = createSlice({
    name: "storyQuestionSlice",
    initialState: initState,
    reducers: {

    },
    extraReducers: (builder) => {
        storyQuestionExtraReducers.builderGetStoryQuest(builder);
    }
});

export const {  } = storyQuestionSlice.actions;
export default storyQuestionSlice.reducer;