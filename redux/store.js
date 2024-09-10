import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailSlice from "./reducers/car/carDetailSlice";
import authSlice from "./reducers/auth/authSlice";
import orderSlice from "./reducers/order/orderSlice";
//npm i @reduxjs/toolkit react-redux

export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetail: carDetailSlice,
    auth: authSlice,
    order: orderSlice
  },
  enhancers:
    (getDefaultEnhancers) =>
      __DEV__ ? getDefaultEnhancers()
        .concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
})
