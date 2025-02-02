import { IAnswer } from "@/interfaces/IRedux";
import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    answers: IAnswer[];
}

const initState: IinitialState = {
    answers: [],
}

export const answerSlice = createSlice({
    name: "answerSlice",
    initialState: initState,
    reducers: {
        setAnswer: (state, action) => {
            console.log(action.payload);
            state.answers = action.payload;
        },
    },
    extraReducers: (builder) => {

    }
});

export const { setAnswer } = answerSlice.actions;
export default answerSlice.reducer;