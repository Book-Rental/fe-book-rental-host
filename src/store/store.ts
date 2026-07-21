import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "./services/Slices/authSlice";
import wishlistReducer from "./services/Slices/wishlistSlice";

// 1. Combine your slices into a root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    wishlist: wishlistReducer,
});

// 2. Define your persistence configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "wishlist"], // Specifies which slices to save permanently
};

// 3. Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store with middleware adjustments to prevent serialization warnings
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 5. Create the persistor instance
export const persistor = persistStore(store);

// 6. Keep your sync logic active
store.subscribe(() => {
    const state = store.getState();
    window.HOST_USER_INFO = state.auth.userInfo;
    window.HOST_WISHLISTS = state.wishlist.wishlists;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
