import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/Slices/authSlice";
import wishlistReducer from "./services/Slices/wishlistSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        wishlist: wishlistReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    window.HOST_USER_INFO = state.auth.userInfo;
    window.HOST_WISHLISTS = state.wishlist.wishlists;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;