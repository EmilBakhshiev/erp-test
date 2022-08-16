import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../api/api';
import {

  API_AUTH_ROUTE,
  API_REGISTER_ROUTE,
  JWT,
} from '../../utils/constants';
import { Status } from '../../types/StatusEnum';
import { IAuthResponse, IAuthState, IRegisterResponse } from '../../types/auth';
import { AxiosError, AxiosResponse } from 'axios';

export const initialState: IAuthState = {
  isAuth: false,
  statusAuth: Status.IDLE,
  message: '',
};

interface PostLoginArg {
  username: string;
  password: string;
}

export const postLogin = createAsyncThunk<any, PostLoginArg>(
  'auth/postLogin',
  async (params, thunkAPI) => {
    const { username, password } = params;

    try {
      const { data } = await $api.post<IAuthResponse>(API_AUTH_ROUTE, {
        username,
        password,
      });

      const token = data.token;
      localStorage.setItem(JWT, token);
      return data;
    } catch (error) {
      const err = error as AxiosError<IAuthResponse>;
      const response = err.response as AxiosResponse<IAuthResponse>;
      return thunkAPI.rejectWithValue(response.data.error);
    }
  }
);

export const postRegister = createAsyncThunk<any, PostLoginArg>(
  'auth/postRegister',
  async (params, thunkAPI) => {
    const { username, password } = params;
    try {
      const { data } = await $api.post<IRegisterResponse>(API_REGISTER_ROUTE, {
        username,
        password,
      });
      return data;
    } catch (error) {
      const err = error as AxiosError<IAuthResponse>;
      const response = err.response as AxiosResponse<IAuthResponse>;
      return thunkAPI.rejectWithValue(response.data.error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // AUTH EXTRA REDUCER
    builder.addCase(postLogin.pending, (state) => {
      state.statusAuth = Status.LOADING;
    });
    builder.addCase(postLogin.fulfilled, (state) => {
      state.isAuth = true;
      state.statusAuth = Status.SUCCESS;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.statusAuth = Status.ERROR;
      state.message = action.payload as string;
    });

    // REEGISTER EXTRA REDUCER
    builder.addCase(postRegister.pending, (state) => {
      state.statusAuth = Status.LOADING;
    });
    builder.addCase(
      postRegister.fulfilled,
      (state, action: PayloadAction<IRegisterResponse>) => {
        state.statusAuth = Status.SUCCESS;
        state.message = action.payload.message;
      }
    );
    builder.addCase(postRegister.rejected, (state, action) => {
      state.statusAuth = Status.ERROR;
      state.message = action.payload as string;
    });
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
