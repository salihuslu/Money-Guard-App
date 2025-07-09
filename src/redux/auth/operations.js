import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionsApi, setToken, removeToken } from '../../services/api';

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const res = await userTransactionsApi.post('/auth/sign-up', credentials);
            setToken(res.data.token);

            return {
                user: {
                    name: res.data.name,
                    email: res.data.email,
                },
                token: res.data.token,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            );
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await userTransactionsApi.post('/auth/sign-in', credentials);

            if (!res.data.token) {
                throw new Error('Token did not arrive');
            }

            setToken(res.data.token);

            const userRes = await userTransactionsApi.get('/users/current');

            return {
                user: userRes.data,
                token: res.data.token,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            removeToken();
            localStorage.removeItem('persist:auth');
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue('Logout işlemi başarısız');
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        if (!token) {
            return thunkAPI.rejectWithValue('No token found');
        }

        setToken(token);

        try {
            const { data } = await userTransactionsApi.get('/users/current');
            console.log({ data })
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Session refresh failed');
        }
    }
);

export const getBalanceThunk = createAsyncThunk(
    'auth/getBalance',
    async (_, thunkAPI) => {
        try {
            const { data } = await userTransactionsApi.get('/users/current'); // 🔧 doğru endpoint
            return data.balance;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
