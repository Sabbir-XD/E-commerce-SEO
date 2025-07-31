import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
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
