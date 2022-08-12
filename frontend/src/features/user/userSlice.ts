import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFriendRequest, IUser } from '../../interfaces';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

let user: any = null;

if (localStorage.getItem('user')) {
  const userInfo = JSON.parse(localStorage.getItem('user')!);
  // console.log(token);
  const info: any = jwtDecode(userInfo.token);
  // console.log(info);
  // console.log(info.exp * 1000 > Date.now());
  if (info.exp * 1000 > Date.now()) {
    user = userInfo;
  } else {
    user = null;
  }
}

const initialState = {
  user,
  refetch: false,
  onlineUsers: [],
  friendRequests: [],
};

export const updateNotifications = createAsyncThunk(
  '/user/updateNotifications',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().user.user.token;
      const { data } = await axios.get('/messageNotifications/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteNotifications = createAsyncThunk(
  '/user/deleteNotifications',
  async (from: string, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().user.user.token;
      await axios.delete('/messageNotifications/' + from, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return from;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.friendRequests = action.payload.friendRequests?.filter(
        (fr: IFriendRequest) => fr.from._id !== action.payload._id
      );
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.friendRequests = [];
      localStorage.removeItem('token');
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setRefetch: (state) => {
      state.refetch = !state.refetch;
    },
    updateUser: (state, action) => {
      state.user = {
        ...action.payload,
        token: state.user?.token,
      };
    },
    addFriendRequest: (state, action: PayloadAction<IFriendRequest>) => {
      state.user?.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action: PayloadAction<IFriendRequest>) => {
      state.user.friendRequests = state.user?.friendRequests.filter(
        (fr: IFriendRequest) => fr._id !== action.payload._id
      );
      state.friendRequests = state.friendRequests?.filter(
        (fr: IFriendRequest) => fr._id !== action.payload._id
      );
    },
    addFriend: (state, action: PayloadAction<IUser>) => {
      state.user?.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<IUser>) => {
      state.user.friends = state.user?.friends.filter(
        (user: IUser) => user._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateNotifications.fulfilled, (state, action) => {
        state.user.messageNotifications = action.payload;
      })
      .addCase(deleteNotifications.fulfilled, (state, action) => {
        state.user.messageNotifications =
          state.user.messageNotifications.filter(
            (n: any) => n.from._id !== action.payload
          );
      });
  },
});

export const {
  login,
  logout,
  setOnlineUsers,
  updateUser,
  addFriendRequest,
  removeFriendRequest,
  removeFriend,
  addFriend,
  setRefetch,
} = userSlice.actions;

export default userSlice.reducer;
