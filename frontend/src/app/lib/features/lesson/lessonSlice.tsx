
import { createSlice } from "@reduxjs/toolkit";
import { ILessonInitialState } from "@/interfaces/IRedux";
import { lessonExtraReducers } from "./lessonExtraReducers";

const initState: ILessonInitialState = {
    lesson: null,
    lessonPageDtos: null,
    lessonWordsPageDtos: null,
    loading: false,
    status: "IDLE",
    responseMessage: ""
}

export const lessonSlice = createSlice({
    name: "lessonSlice",
    initialState: initState,
    reducers: {

    },
    extraReducers: (builder) => {
        lessonExtraReducers.builderFindByUserId(builder);
        lessonExtraReducers.builderFindByLessonId(builder);
    }
});

export const {  } = lessonSlice.actions;
export default lessonSlice.reducer;