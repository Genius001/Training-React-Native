import { createAsyncThunk } from "@reduxjs/toolkit";

//middleware function untuk fetch data dari (penyambung component ke store)
export const fetchCars = createAsyncThunk(
    "fetchCars",
    async (signal) => {
        const response = await fetch(`https://api-car-rental.binaracademy.org/customer/car/`,
            { signal: signal });
        return response?.json();
    });

export const fetchCarDetail = createAsyncThunk(
    "fetchCarsDetail",
    async ({ id, signal }) => {
        const response = await fetch(`https://api-car-rental.binaracademy.org/customer/car/` + id,
            { signal: signal }
        );
        return response?.json();
    })