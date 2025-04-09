import { IPaginationParams } from "@/interfaces/IPaginationParams";
import UserWordsService from "@/services/UserWordsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FindByParams {
  id: number;
  status: string;
  pagination: IPaginationParams;
}

export const findByUserIdAndStatus = createAsyncThunk(
  'findByUserIdAndStatus',
  async ({ id, status, pagination }: FindByParams) => {
    const response = await UserWordsService.findByUserIdAndStatus(id, status, pagination);
    return response;
  }
);

export const importWordsUser = createAsyncThunk(
  'importWordsUser',
  async (userId: number) => {
    const response = await UserWordsService.importWordsUser(userId);
    return response;
  }
);
