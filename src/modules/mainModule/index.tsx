import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { useWishlist } from "../../hooks/useWishlist";
import { useDispatch, useSelector } from "react-redux";
import { setWishlists } from "../../store/services/Slices/wishlistSlice";
import { RootState } from "../../store/store";

function MainModule() {
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.auth.userInfo?._id,
  );

  const {
    data: lists = [],
    isSuccess,
    refetch,
  } = useWishlist(userId ?? "");

  // Update Redux whenever wishlist changes
  useEffect(() => {
    if (!isSuccess) return;

    const wishlistMap: Record<string, string[]> = {};

    lists.forEach((wishlist) => {
      wishlistMap[wishlist.wishlistId] = wishlist.books.map(
        (book) => book.bookId,
      );
    });

    dispatch(setWishlists(wishlistMap));
  }, [lists, isSuccess, dispatch]);

  // Listen for refresh event
  useEffect(() => {
    const handleWishlistRefresh = () => {
      if (userId) {
        refetch();
      }
    };

    window.addEventListener(
      "wishlist-refresh",
      handleWishlistRefresh,
    );

    return () => {
      window.removeEventListener(
        "wishlist-refresh",
        handleWishlistRefresh,
      );
    };
  }, [refetch, userId]);

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