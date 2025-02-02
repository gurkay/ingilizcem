import { StatusConsts } from "@/constants/StatusConsts";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserWordsPageDto } from "@/interfaces/IPaginationParams";
import { findByUserIdAndStatus } from "./userWordsCreateAsyncThunk";
import { IUserWordsInitialState } from "@/interfaces/IRedux";


export const userWordsExtraReducers = {
    builderFindByUserIdAndStatus: function(builder: ActionReducerMapBuilder<IUserWordsInitialState>) {

        builder.addCase(findByUserIdAndStatus.pending, (state) => {
            state.loading = true;
            state.status = StatusConsts.LOADING;
        });
    
        builder.addCase(findByUserIdAndStatus.fulfilled, (state, action: PayloadAction<IUserWordsPageDto>) => {
            console.log("findByUserIdAndStatus.fulfilled:::action.payload", action.payload);
            state.loading = false;
            state.userWordsPageDtos = action.payload;
            state.status = StatusConsts.SUCCESS;
        });
    
        builder.addCase(findByUserIdAndStatus.rejected, (state) => {
            state.loading = false;
            state.status = StatusConsts.ERROR;
        });
    },
}