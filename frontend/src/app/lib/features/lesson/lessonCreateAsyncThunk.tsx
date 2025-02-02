import { IPaginationParams } from "@/interfaces/IPaginationParams";
import LessonService from "@/services/LessonService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FindByParams {
  id: number;
  pagination: IPaginationParams;
}

export const findByUserId = createAsyncThunk(
  'findByUserId',
  async ({ id, pagination }: FindByParams) => {
    const response = await LessonService.findByUserId(id, pagination);
    return response;
  }
);

export const findByLessonIdAndSearch = createAsyncThunk(
  'findByLessonIdAndSearch',
  async ({ id, pagination }: FindByParams) => {
    const response = await LessonService.findByLessonIdAndSearch(id, pagination);
    return response;
  }
);

export const updateWordStatus = createAsyncThunk(
    'updateWordStatus',
    async ({ lessonWordId, status }: { lessonWordId: number, status: string }) => {
        const response = await LessonService.updateWordStatus(lessonWordId, status);
        return response;
    }
);