import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartBookIds: (_, action: PayloadAction<string[]>) => {
      return action.payload;
    },

    addBookId: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },

    removeBookId: (state, action: PayloadAction<string>) => {
      return state.filter((id) => id !== action.payload);
    },

    clearCart: () => {
      return [];
    },
  },
});

export const {
  setCartBookIds,
  addBookId,
  removeBookId,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;