import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrders, addOrder, clearOrders } = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;

export const selectOrderByNumber = (state, orderNumber) =>
  state.orders.orders.find((order) => order.orderNumber === orderNumber);

export default orderSlice.reducer;
