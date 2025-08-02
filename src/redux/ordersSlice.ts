import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  items: OrderItem[];
  total: number;
  date: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
