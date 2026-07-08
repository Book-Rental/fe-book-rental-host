import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/Slices/authSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    console.log('state', state)
   
    window.HOST_USER_INFO = state.auth.userInfo;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;