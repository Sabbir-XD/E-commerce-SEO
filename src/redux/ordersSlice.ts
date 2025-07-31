import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  items: { id: number; title: string; price: number; quantity: number }[];
  total: number;
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
