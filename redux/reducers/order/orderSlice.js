import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip } from "./orderApi";

const initialState = {
  isLoading: false,
  carId: null,
  data: {},
  errorMessage: null,

  activeStep: 0,
  selectedBank: null,
  promo: null,
  isModalVisible: false,
  status: "pending",
  // paymentCountdown: null,
  // verificationCountdown: null,
};

const orderSlice = createSlice({
  name: "order",
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
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
      // state.isModalVisible = true;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true;
      state.status = "error";
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });

    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false
      // state.isError = true;
      state.errorMessage = action.payload
      // state.isModalVisible = true;
    });
  },
});

export { postOrder, putOrderSlip };
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
