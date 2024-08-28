import { createSlice } from "@reduxjs/toolkit";
import { fetchCarDetail } from "./carApi";

const carDetailSlice = createSlice({
    name: "carDetail",
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarDetail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(fetchCarDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCarDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            });
    },
});

export const getCarDetail = fetchCarDetail;
export const selectCarDetail = (state) => state.carDetail;
export default carDetailSlice.reducer;
