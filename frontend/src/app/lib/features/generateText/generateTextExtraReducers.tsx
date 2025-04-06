import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { getPrompt, getStoryQuiz, getTranslateFromEnglish, googleAi } from "./generateTextCreateAsyncThunk";
import { getStringToJson } from "@/utils/getStringToJson";

export const generateTextExtraReducers = {
    builderGetPrompt: function(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getPrompt.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPrompt.fulfilled, (state, action: PayloadAction<any>) => {
            console.log('generateTextExtraReducers:::getPrompt:::output', action.payload.output);
            state.loading = false;
            state.output = action.payload.output;
        });
        builder.addCase(getPrompt.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    },
    builderGoogleAi: function(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(googleAi.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(googleAi.fulfilled, (state, action: PayloadAction<any>) => {
            console.log('generateTextExtraReducers:::getPrompt:::output', action.payload.output);
            state.loading = false;
            state.output = action.payload.output;
        });
        builder.addCase(googleAi.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    }, 
    builderGetTranslateFromEnglish: function(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getTranslateFromEnglish.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTranslateFromEnglish.fulfilled, (state, action: PayloadAction<any>) => {
            console.log('generateTextExtraReducers:::getTranslateFromEnglish:::output', action.payload.output);
            state.loading = false;
            state.translate = action.payload.output;
        });
        builder.addCase(getTranslateFromEnglish.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    },
    builderGetStoryQuiz: function(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getStoryQuiz.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStoryQuiz.fulfilled, (state, action: PayloadAction<any>) => {
            console.log('generateTextExtraReducers:::getStoryQuiz:::output', action.payload.output);
            state.loading = false;
            state.quiz = action.payload.output;
        });
        builder.addCase(getStoryQuiz.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    }
}