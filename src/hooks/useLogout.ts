import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/services/Slices/cartSlice";
import { logout } from "../store/services/Slices/authSlice";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Core API caller function
const logoutUserApi = async (): Promise<void> => {
    const response = await fetch(`${backendUrl}/api/auth/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Equivalent to withCredentials: true
    });

    if (!response.ok) {
        throw new Error("Server failed to process logout requests properly");
    }
};

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: logoutUserApi,
        // OnMutate/OnSettled ensures cleanup runs even if the backend network request fails
        onSettled: () => {
            // 1. Purge all cached data inside TanStack Query memory pools
            queryClient.clear();

            // 2. Clear client-side local Redux memory trees
            dispatch(clearCart());
            dispatch(logout())
            // 3. Clear persistent client storage structures
            localStorage.clear();
            sessionStorage.clear();

            // 4. Purge Micro-Frontend Global Window Namespaces
            delete (window as any).HOST_CART_BOOK_IDS;
            delete (window as any).HOST_WISHLISTS;

            // 5. Broadcast custom events to child MFEs (PLP, PDP, etc.)
            window.dispatchEvent(new CustomEvent("user-logged-out"));

            // 6. Push client window view context to public zones
            navigate("/");
        },
    });

    return {
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
        error: logoutMutation.error,
    };
};
