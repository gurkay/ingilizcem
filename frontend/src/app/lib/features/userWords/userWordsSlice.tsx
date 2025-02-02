
import { createSlice } from "@reduxjs/toolkit";
import { IUserWordsInitialState } from "@/interfaces/IRedux";
import { userWordsExtraReducers } from "./userWordsExtraReducers";

const initState: IUserWordsInitialState = {
    userWordsPageDtos: null,
    loading: false,
    status: "IDLE",
    responseMessage: ""
}

export const userWordsSlice = createSlice({
    name: "lessonSlice",
    initialState: initState,
    reducers: {

    },
    extraReducers: (builder) => {
        userWordsExtraReducers.builderFindByUserIdAndStatus(builder);
    }
});

export const {  } = userWordsSlice.actions;
export default userWordsSlice.reducer;