import { createSlice } from "@reduxjs/toolkit";
// import { postOrder } from "./authApi";
import * as SecureStore from 'expo-secure-store';

const orderSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        carId: null,
        startRent: null,
        endRent: null,
        data: {},
        paymentCountdown: null,
        paymentMethod: null,
        verificationCountdown: null,
        errorMessage: null,
    },
    reducers: {
        setCarId: (state, { payload }) => {
            state.carId = payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(postorder.pending, (state, action) => {
        //   state.isLoading = true;
        // });
        // builder.addCase(postorder.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.data = action.payload;
        //   state.isModalVisible = true;
        // });
        // builder.addCase(postorder.rejected, (state, action) => {
        //   state.isLoading = false
        //   state.isError = true;
        //   state.errorMessage = action.payload
        //   state.isModalVisible = true;
        // });
    },
});

// export { postorder };
export const { setCarId } = orderSlice.actions
export const selectOrder = state => state.order //selector
export default orderSlice.reducer