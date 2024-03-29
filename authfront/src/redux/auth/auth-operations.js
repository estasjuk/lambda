import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from "../../shared/api/auth";

export const signupUser = createAsyncThunk(
  'auth/signup',
  async(data, {rejectWithValue}) => {
    try {
        const result = await api.signup(data);
        return result;
    } catch ({response}) {
        const {status, data} = response;
        const error = {
            status,
            message: data.message,
        }
        return rejectWithValue(error);
    }
}
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async(data, {rejectWithValue}) => {
      try {
          const result = await api.login(data);
          return result;
      } catch ({response}) {
          const {status, data} = response;
          const error = {
              status,
              message: data.message,
          }
          return rejectWithValue(error);
      }
  }
)

export const getCurrentUser = createAsyncThunk(
    "auth/current",
    async(_, {rejectWithValue, getState}) => {
        try {
            const {auth} = getState()
            const result = await api.getCurrent(auth.token);
            return result;
        } catch ({response}) {
            const {status, data} = response;
            const error = {
                status,
                message: data.message,
            }
            return rejectWithValue(error);
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
  "auth/logout",
  async(_, {rejectWithValue}) => {
      try {
          const result = await api.logout();
          return result;
      } catch ({response}) {
          const {status, data} = response;
          const error = {
              status,
              message: data.message,
          }
          return rejectWithValue(error);
      }
  }
)