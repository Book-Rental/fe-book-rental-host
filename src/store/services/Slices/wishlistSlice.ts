import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  wishlists: Record<string, string[]>;
}

const initialState: WishlistState = {
  wishlists: {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlists: (
      state,
      action: PayloadAction<Record<string, string[]>>
    ) => {
      state.wishlists = action.payload;
    },
  },
});
export const {
    setWishlists
} = wishlistSlice.actions;

export default wishlistSlice.reducer;