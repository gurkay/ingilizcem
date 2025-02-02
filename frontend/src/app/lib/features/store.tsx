import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import lessonSlice from "./lesson/lessonSlice";
import userWordsSlice from "./userWords/userWordsSlice";
import generateTextSlice from "./generateText/generateTextSlice";
import answerSlice from "./answer/answerSlice";
import storyQuestionSlice from "./storyQuestion/storyQuestionSlice";



export const store = configureStore({
    reducer: {
        lessonReducer: lessonSlice,
        userWordsReducer: userWordsSlice,
        generateTextReducer: generateTextSlice,
        answerReducer: answerSlice,
        storyQuestionReducer: storyQuestionSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;