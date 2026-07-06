import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserInfo {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    token: string | null;
    userInfo: UserInfo | null;
    isAuthenticated: boolean;
}
interface LoginPayload {
    token: string;
    userInfo: UserInfo;
}

const initialState: AuthState = {
    token: null,
    userInfo: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.userInfo;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.token = null;
            state.userInfo = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;