import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStoryQuest: any = createAsyncThunk('getStoryQuest', async (prop: string) => {
  const response = await axios.post('/api/generateQuestion', {
    body: prop
  }, {
    headers: {
      'Content-type': 'application/json'
    }
  });
  return Promise.resolve(response.data);
});
