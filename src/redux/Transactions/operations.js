import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionsApi } from '../../services/api';

export const getTransactions = createAsyncThunk('transactions/all', async (_, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.get('/transactions');
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData, thunkAPI) => {
        try {
            const response = await userTransactionsApi.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Add transaction failed');
        }
    }
);


export const deleteTransaction = createAsyncThunk('transactions/delete', async (id, thunkApi) => {
    try {
        await userTransactionsApi.delete(`/transactions/${id}`);
        return id;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const editTransactions = createAsyncThunk('transactions/edit', async ({ id, transaction }, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.patch(`/transactions/${id}`, transaction);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});