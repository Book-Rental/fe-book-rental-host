import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useWishlist } from "../../hooks/useWishlist";
import { setWishlists } from "../../store/services/Slices/wishlistSlice";
import { RootState } from "../../store/store";

function MainModule() {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.auth.userInfo?._id
  );

  const {
    data: lists = [],
    isSuccess,
    refetch,
  } = useWishlist(userId ?? "");

  // Update Redux + Global Window
  useEffect(() => {
    if (!isSuccess) return;

    const wishlistMap: Record<string, string[]> = {};

    lists.forEach((wishlist) => {
      wishlistMap[wishlist.wishlistId] = wishlist.books.map(
        (book) => book.bookId
      );
    });

    dispatch(setWishlists(wishlistMap));

    // Update global object
    window.HOST_WISHLISTS = wishlistMap;

    // Notify widgets
    window.dispatchEvent(
      new CustomEvent("wishlist-state-changed", {
        detail: wishlistMap,
      })
    );
  }, [lists, isSuccess, dispatch]);

  // Refetch when requested
  useEffect(() => {
    const handleWishlistRefresh = async () => {
      if (!userId) return;

      await refetch();
    };

    window.addEventListener(
      "wishlist-refresh",
      handleWishlistRefresh
    );

    return () => {
      window.removeEventListener(
        "wishlist-refresh",
        handleWishlistRefresh
      );
    };
  }, [userId, refetch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainModule;