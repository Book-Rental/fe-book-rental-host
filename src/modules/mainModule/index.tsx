import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

import { setWishlists } from "../../store/services/Slices/wishlistSlice";
import { setCartBookIds } from "../../store/services/Slices/cartSlice";

import { RootState } from "../../store/store";

import { Rb_BreadCrumb } from "@rentbook/rentbook-ui-lib";
import { breadcrumbMap } from "../../config/breadcrumbConfig";
import { getBreadcrumb } from "../../utils/breadcrumbHelper";

function MainModule() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [widgetLoaded, setWidgetLoaded] = useState(false);

  const userId = useSelector(
    (state: RootState) => state.auth.userInfo?._id
  );

  // Wishlist
  const {
    data: lists = [],
    isSuccess: wishlistSuccess,
    refetch: refetchWishlist,
  } = useWishlist(userId ?? "");

  // Cart
  const {
    data: cart,
    isSuccess: cartSuccess,
    refetch: refetchCart,
  } = useCart();

  const breadcrumb = useMemo(() => {
    const dynamicBreadcrumb = getBreadcrumb(
      location.pathname,
      location.search
    );

    return dynamicBreadcrumb.length > 0
      ? dynamicBreadcrumb
      : breadcrumbMap[location.pathname] ?? [];
  }, [location.pathname, location.search]);

  useEffect(() => {
    setWidgetLoaded(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleWidgetLoading = (
      event: CustomEvent<boolean>
    ) => {
      setWidgetLoaded(!event.detail);
    };

    window.addEventListener(
      "widget-loading-status",
      handleWidgetLoading as EventListener
    );

    return () => {
      window.removeEventListener(
        "widget-loading-status",
        handleWidgetLoading as EventListener
      );
    };
  }, []);

  // Wishlist State
  useEffect(() => {
    if (!wishlistSuccess) return;

    const wishlistMap: Record<string, string[]> = {};

    lists.forEach((wishlist) => {
      wishlistMap[wishlist.wishlistId] = wishlist.books.map(
        (book) => book.bookId
      );
    });

    dispatch(setWishlists(wishlistMap));

    window.HOST_WISHLISTS = wishlistMap;

    window.dispatchEvent(
      new CustomEvent("wishlist-state-changed", {
        detail: wishlistMap,
      })
    );
  }, [lists, wishlistSuccess, dispatch]);

  // Cart State
  useEffect(() => {
    if (!cartSuccess || !cart) return;
    console.log(cart)
    const bookIds = cart.items.map((book) => book.bookId._id);
    console.log('book iDs', bookIds)

    // dispatch(setCartBookIds(bookIds));

    // window.HOST_CART = bookIds;

    window.dispatchEvent(
      new CustomEvent("cart-state-changed", {
        // detail: bookIds,
      })
    );
  }, [cart, cartSuccess, dispatch]);

  // Wishlist Refresh
  useEffect(() => {
    const handleWishlistRefresh = async () => {
      if (!userId) return;

      await refetchWishlist();
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
  }, [userId, refetchWishlist]);

  // Cart Refresh
  useEffect(() => {
    const handleCartRefresh = async () => {
      await refetchCart();
    };

    window.addEventListener(
      "cart-refresh",
      handleCartRefresh
    );

    return () => {
      window.removeEventListener(
        "cart-refresh",
        handleCartRefresh
      );
    };
  }, [refetchCart]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {widgetLoaded && breadcrumb.length > 0 && (
        <div className="mt-4 mx-3">
          <Rb_BreadCrumb
            items={breadcrumb}
            onNavigate={navigate}
          />
        </div>
      )}

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainModule;