import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://142.93.134.108:1111',
});

const setToken = token => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await instance.post('/sign_up', credentials);
      setToken(result.data.token);
      return result.data;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await instance.post('/login', credentials);
      setToken(result.data.token);
      return result.data;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const persistedToken = auth.token;
    try {
      setToken(persistedToken);
      const response = await instance.get('/me');
      return response.data;
    } catch ({ response }) {
      setToken();
      return thunkAPI.rejectWithValue(response);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post('/logout');
      setToken();
      return response.data;
    } catch ({ response }) {
      return rejectWithValue(response);
    }
  }
);