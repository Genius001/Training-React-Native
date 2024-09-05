import { createSlice } from '@reduxjs/toolkit';
import { fetchAuth, registerUser } from './authApi';
import * as SecureStore from 'expo-secure-store';

// Async function to get stored auth data
const getStoredAuth = async () => {
  const authData = await SecureStore.getItemAsync('auth');
  return authData ? JSON.parse(authData) : null;
};

// Async function to set auth data
const setStore = async (data) => {
  await SecureStore.setItemAsync('auth', JSON.stringify(data));
};

const initialState = {
  isLoading: false,
  user: {}, // Initial empty user object
  isModalVisible: false,
  isAuthenticated: false,
  error: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      SecureStore.deleteItemAsync('auth');
    },
    closeModal: (state) => {
      state.isModalVisible = false;
      state.error = false;
      state.errorMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        setStore(action.payload); // Store user data in SecureStore
        state.isModalVisible = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'An error occurred during login';
        state.isModalVisible = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        setStore(action.payload); // Store user data in SecureStore
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'An error occurred during registration';
      });
  },
});

export const { setUser, logout, closeModal } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const initializeAuth = () => async (dispatch) => {
  const storedAuth = await getStoredAuth();
  if (storedAuth) {
    dispatch(setUser(storedAuth));
  }
};
export default authSlice.reducer;
export { fetchAuth, registerUser };
