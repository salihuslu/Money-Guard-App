import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser, getBalanceThunk } from './operations';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        clearCredentials: state => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = null;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, state => {
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(refreshUser.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, state => {
                state.isRefreshing = false;
                state.isLoggedIn = false;
                state.token = null;
            })

            .addCase(getBalanceThunk.fulfilled, (state, { payload }) => {
                state.user.balance = payload;
            })
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.error = null;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state) => {
                    state.isRefreshing = false;
                }
            );
    }
});

export const { clearError, setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;