import { createSlice } from '@reduxjs/toolkit';
import { fetchAuth, registerUser } from './authApi';
import * as SecureStore from 'expo-secure-store';

// Async function to get stored auth data
const getStoredAuth = () => {
  const user = SecureStore.getItem('user');
  console.log(JSON.parse(user).email)
  return user ? JSON.parse(user) : null;
};

// Async function to set auth data
const setStore = async (value) => {
  await SecureStore.setItemAsync('user', JSON.stringify(value));
};

// Initial state for the auth slice
const initialState = {
  isLoading: false,
  user: getStoredAuth().email,
  accessToken: getStoredAuth().access_token,
  isModalVisible: false,
  isAuthenticated: getStoredAuth().email ? true : false,
  error: false,
  errorMessage: null,

};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalVisible = false;
      state.error = false;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      SecureStore.deleteItemAsync('user'); // Ensure async storage is cleared
    },
    // Set initial data from async storage
    setAuthData: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.email;
        state.accessToken = action.payload.access_token;
        setStore(action.payload);
        state.isModalVisible = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload?.message || 'An error occurred during login';
        state.isModalVisible = true;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.user = action.payload.user; // user object from registration
        state.accessToken = action.payload.access_token; // access_token from registration
        setStore(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload?.message || 'An error occurred during registration';
      });
  },
});

// Thunk to initialize auth state
// export const initializeAuth = () => async (dispatch) => {
//   const storedAuth = await getStoredAuth();
//   if (storedAuth) {
//     dispatch(authSlice.actions.setAuthData(storedAuth));
//   }
// };

export { authSlice };
export { fetchAuth, registerUser };
export const { closeModal, logout, setAuthData } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
