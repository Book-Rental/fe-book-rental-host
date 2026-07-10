import { UserInfo } from "../store/services/Slices/authSlice";

declare global {
    interface Window {
        renderReactWidget?: (config: string) => void;
        unmountReactWidget?: (id: string) => void;

        HOST_USER_INFO: UserInfo | null;
        HOST_WISHLISTS: Record<string, string[]>;
    }
}