import { useQuery } from "@tanstack/react-query";

export interface Book {
    _id: string;
    name: string;
    description: string;
    author: string;
    coverImage: string;
    purchasePrice: number;
    rentalPricePerDay: number;
    rentalPricePerWeek: number;
    rentalPricePerMonth: number;
    securityDeposit: number;
    isActive: boolean;
    isAvailable: boolean;
    quantity: number;
}

export interface CartItem {
    bookId: Book;
    quantity: number;
    pricingMode: "rent" | "buy";
    rentalPeriod: "day" | "week" | "month";
    addedAt: string;
}

export interface CartSummaryItem {
    bookId: string;
    quantity: number;
    pricingMode: "rent" | "buy";
    rentalPeriod: "day" | "week" | "month";
    unitPrice: number;
    lineSubtotal: number;
    securityDepositLine: number;
}

export interface CartSummary {
    subtotal: number;
    securityDepositTotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    items: CartSummaryItem[];
}

export interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
    summary: CartSummary;
}

export interface CartResponse {
    status: string;
    message: string;
    data: Cart;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchCart = async (): Promise<Cart> => {
    const response = await fetch(`${backendUrl}/api/cart`, {
        method: "GET",
        credentials: "include", // Equivalent to withCredentials: true
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
    }

    const result: CartResponse = await response.json();

    return result.data;
};

export const useCart = () => {
    return useQuery<Cart, Error>({
        queryKey: ["cart"],
        queryFn: fetchCart,
    });
};