import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  _id?: string;
  fullName?: string;
  phoneNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  isVerified: boolean;
  status: string;
  addresses: Address[];
}

export interface AuthState {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
}

interface LoginPayload {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  userInfo: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },

    updateAddresses: (state, action: PayloadAction<Address[]>) => {
      if (state.userInfo) {
        state.userInfo.addresses = action.payload;
      }
    },

    updateUser: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateAddresses,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;