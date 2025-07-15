import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    getTransactions,
    addTransaction,
    editTransactions,
    deleteTransaction,
} from './operations';

const initialState = {
    isTransLoading: false,
    isTransError: null,
    transactions: [],
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getTransactions.fulfilled, (state, { payload }) => {
                state.transactions = payload;
            })
            .addCase(addTransaction.fulfilled, (state, { payload }) => {
                console.log('payload after adding transaction:', payload);
                state.transactions.unshift(payload); // ✅ Yeni işlemi en başa ekle
            })
            .addCase(editTransactions.fulfilled, (state, { payload }) => {
                const index = state.transactions.findIndex(tx => tx.id === payload.id);
                if (index !== -1) {
                    state.transactions[index] = payload;
                }
            })
            .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
                state.transactions = state.transactions.filter(tx => tx.id !== payload);
            })
            .addMatcher(
                isAnyOf(
                    getTransactions.fulfilled,
                    addTransaction.fulfilled,
                    editTransactions.fulfilled,
                    deleteTransaction.fulfilled
                ),
                state => {
                    state.isTransLoading = false;
                    state.isTransError = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getTransactions.pending,
                    addTransaction.pending,
                    editTransactions.pending,
                    deleteTransaction.pending
                ),
                state => {
                    state.isTransLoading = true;
                    state.isTransError = null;
                }
            )
            .addMatcher(
                isAnyOf(
                    getTransactions.rejected,
                    addTransaction.rejected,
                    editTransactions.rejected,
                    deleteTransaction.rejected
                ),
                (state, { payload }) => {
                    state.isTransLoading = false;
                    state.isTransError = payload;
                }
            );
    },
});

export const transactionsReducer = transactionsSlice.reducer;
