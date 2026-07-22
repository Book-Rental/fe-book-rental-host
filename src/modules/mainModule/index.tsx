import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useWishlist } from "../../hooks/useWishlist";
import { setWishlists } from "../../store/services/Slices/wishlistSlice";
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

  const {
    data: lists = [],
    isSuccess,
    refetch,
  } = useWishlist(userId ?? "");

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