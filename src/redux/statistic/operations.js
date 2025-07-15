import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionsApi, setToken } from '../../services/api';

export const getTransactionsSummaryByPeriod = createAsyncThunk('transaction/summary', async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (savedToken) {
        setToken(savedToken);
    } else {
        return thunkApi.rejectWithValue('Unable to fetch');
    }
    try {
        const { data } = await userTransactionsApi.get(`/transactions-summary?month=${month}&year=${year}`);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const getTransactionsCategories = createAsyncThunk(
    'statistic/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await userTransactionsApi.get('/transaction-categories');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);