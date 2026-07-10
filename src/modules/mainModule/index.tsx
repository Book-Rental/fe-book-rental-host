import { Outlet } from "react-router-dom";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { useWishlist } from "../../hooks/useWishlist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlists } from "../../store/services/Slices/wishlistSlice";
import { RootState } from "../../store/store";

function MainModule() {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.userInfo?._id);

  const { data: lists = [], isSuccess } = useWishlist(userId ?? "");

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow w-ful ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainModule;