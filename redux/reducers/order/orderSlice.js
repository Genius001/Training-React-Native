import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  carId: null,
  startRent: null,
  endRent: null,
  data: {},
  currentStep: null,
  paymentCountdown: null,
  selectedBank: null,
  promo: null,
  verificationCountdown: null,
  errorMessage: null,
};

const orderSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      state = initialState
    }
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
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
