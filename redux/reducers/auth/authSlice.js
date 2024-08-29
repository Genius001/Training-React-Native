import { createSlice } from '@reduxjs/toolkit';
import { fetchAuth, registerUser } from './authApi';
import * as SecureStore from 'expo-secure-store';

// Async function to get stored auth data
const getStore = async () => {
    const data = await SecureStore.getItemAsync('auth');
    return data ? JSON.parse(data) : null;
};

// Async function to set auth data
const setStore = async (data) => {
    await SecureStore.setItemAsync('auth', JSON.stringify(data));
};

const initialState = {
    user: null,
    isAuthenticated: false,
    isModalVisible: false,
    loading: false,
    error: null,
    data: null,
};

// Async initialization function to set initial state
const initializeAuth = async () => {
    const storedData = await getStore();
    if (storedData) {
        initialState.user = storedData;
        initialState.isAuthenticated = true;
    }
};

initializeAuth();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            SecureStore.deleteItemAsync('auth');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                setStore(action.payload); // Store user data in SecureStore
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred during login';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                setStore(action.payload); // Store user data in SecureStore
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'An error occurred during registration';
            });
    },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
