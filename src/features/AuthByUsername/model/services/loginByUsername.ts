import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

// loginByUsernameProps — request
// User — response
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<User>('http://localhost:8000/login', authData);
      if (response.data) {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
        thunkAPI.dispatch(userActions.setAuthData(response.data));
      } else {
        throw new Error();
      }

      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('Неверный логин или пароль');
    }
  },
);
