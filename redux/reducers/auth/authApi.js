import { createAsyncThunk } from '@reduxjs/toolkit';
//middleware function untuk fetch data dari (penyambung component ke store)

//login
export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api-car-rental.binaracademy.org/customer/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ message: errorData.message || 'Login failed' });
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api-car-rental.binaracademy.org/customer/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: 'Customer' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ message: errorData.message || 'Registration failed' });
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
