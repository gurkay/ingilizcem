import GenerateTextService from "@/services/GenerateTextService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPrompt: any = createAsyncThunk('getPrompt', async (prop: string) => {
  const response = await axios.post('/api/generate', {
    body: prop
  }, {
    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log("response.data:::getPrompt:::", response.data);
  return Promise.resolve(response.data);
});

export const getTranslateFromEnglish: any = createAsyncThunk('getTranslateFromEnglish', async (prop: string) => {
  const response = await axios.post('/api/generate', {
    body: prop
  }, {
    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log('response.data:::getTranslateFromEnglish:::', response.data);
  return Promise.resolve(response.data);
});

export const getStoryQuiz: any = createAsyncThunk('getStoryQuiz', async (prop: string) => {
  const response = await axios.post('/api/generate', {
    body: prop
  }, {
    headers: {
      'Content-type': 'application/json'
    }
  });
  return Promise.resolve(response.data);
});
