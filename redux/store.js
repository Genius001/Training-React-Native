// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailSlice from "./reducers/car/carDetailSlice";
import authSlice, { initializeAuth } from "./reducers/auth/authSlice";
import orderSlice from "./reducers/order/orderSlice";
// npm i @reduxjs/toolkit react-redux
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';

// Create the Redux store
export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetail: carDetailSlice,
    auth: authSlice,
    order: orderSlice,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__ ? getDefaultEnhancers().concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
});

// Initialize auth state
store.dispatch(initializeAuth());

const AppWrapper = ({ children }) => {
  useEffect(() => {
    store.dispatch(initializeAuth()); // Dispatch thunk to initialize auth state
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export { AppWrapper };
