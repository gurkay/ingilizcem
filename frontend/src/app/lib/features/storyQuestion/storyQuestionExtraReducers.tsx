import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { getStoryQuest } from "./storyQuestionCreateAsyncThunk";
import { getStringToJson } from "@/utils/getStringToJson";

export const storyQuestionExtraReducers = {
    builderGetStoryQuest: function(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getStoryQuest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStoryQuest.fulfilled, (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.loading = false;
            state.output = getStringToJson(action.payload.result);
        });
        builder.addCase(getStoryQuest.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    },
}