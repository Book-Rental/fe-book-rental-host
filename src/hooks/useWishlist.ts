import { useQuery } from "@tanstack/react-query";

export interface WishlistBook {
    bookId: string;
}

export interface Wishlist {
    wishlistId: string;
    wishlistName: string;
    books: WishlistBook[];
}
interface WishlistResponse {
    status: string;
    message: string;
    data: Wishlist[];
}

const fetchAllWishlists = async (
    userId: string,
): Promise<Wishlist[]> => {
    const response = await fetch(
        `http://localhost:3000/api/wishList/getAllWishList/${userId}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch wishlist data.");
    }

    const result: WishlistResponse = await response.json();

    return result.data;
};

export const useWishlist = (userId: string) => {
    return useQuery<Wishlist[], Error>({
        queryKey: ["wishlists", userId],
        queryFn: () => fetchAllWishlists(userId),
        enabled: !!userId,
    });
};