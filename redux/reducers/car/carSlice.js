import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carApi";

const carSlice = createSlice({
    name: "car",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
    }
});

export const getCar = fetchCars;
export const selectCar = state => state.car; //selector
export default carSlice.reducer;
