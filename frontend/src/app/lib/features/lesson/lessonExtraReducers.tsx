import { StatusConsts } from "@/constants/StatusConsts";
import { findByLessonIdAndSearch, findByUserId } from "./lessonCreateAsyncThunk";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ILessonInitialState } from "@/interfaces/IRedux";
import { ILessonDto } from "@/interfaces/dtos/lesson/ILessonDto";
import { ILessonPageDto, ILessonWordsPageDto } from "@/interfaces/IPaginationParams";


export const lessonExtraReducers = {
    builderFindByUserId: function(builder: ActionReducerMapBuilder<ILessonInitialState>) {

        builder.addCase(findByUserId.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(findByUserId.fulfilled, (state, action: PayloadAction<ILessonPageDto>) => {
            console.log("findByUserId.fulfilled:::action.payload", action.payload);
            state.loading = false;
            state.lessonPageDtos = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(findByUserId.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },

    builderFindByLessonId: function(builder: ActionReducerMapBuilder<ILessonInitialState>) {

        builder.addCase(findByLessonIdAndSearch.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });

        builder.addCase(findByLessonIdAndSearch.fulfilled, (state, action: PayloadAction<ILessonWordsPageDto>) => {
            state.loading = false;
            state.lessonWordsPageDtos = action.payload;
            state.status = StatusConsts.SUCCESS;
        });

        builder.addCase(findByLessonIdAndSearch.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    }
}