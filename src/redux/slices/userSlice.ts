import { IUserInfo, IUserInfoResponse, IUserState } from '../../types/user';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../api/api';
import { API_ABOUT_ROUTE } from '../../utils/constants';
import { Status } from '../../types/StatusEnum';

export const initialState: IUserState = {
  user: {} as IUserInfo,
  status: Status.IDLE,
};

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const tokenLocal = localStorage.getItem('jwt');
  const { data } = await $api.get<IUserInfoResponse>(API_ABOUT_ROUTE, {
    headers: {
      Authorization: `Bearer ${tokenLocal}`,
    },
  });

  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(
      getUserInfo.fulfilled,
      (state, action: PayloadAction<IUserInfoResponse>) => {
        state.user.about = action.payload.data.about;
        state.user.username = action.payload.data.username;
        state.user.id = action.payload.data.id;
        state.user.avatar = action.payload.data.avatar;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(getUserInfo.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export default userSlice.reducer;
