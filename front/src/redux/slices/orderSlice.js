import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const CreateOrder = createAsyncThunk(
  "CreateOrder",
  async (data, { isRejectedWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/user/createorder",
        
        data,{
            headers: {
              token: token, // Add token to the 'token' header
            },
          }
      );

      return res.data;
    } catch (error) {
      isRejectedWithValue(error.response.data.msg);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    result: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.result = action.payload;
        state.error = null;
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default orderSlice.reducer;
