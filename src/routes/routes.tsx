import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainModule from "../modules/mainModule";

import { ProtectedRoute } from "./ProtectedRoute";
import { ScrollToTop } from "../Component/ScrollToTop";
import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

// 1. Convert static page imports into dynamic lazy imports
const AuthPage = lazy(() => import("../pages/AuthPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const BooksPage = lazy(() => import("../pages/BooksPage"));
const TestPage = lazy(() => import("../pages/TestPage"));
const WishListPage = lazy(() => import("../pages/WishListPage"));
const BooksDetailsPage = lazy(() => import("../pages/BooksDetailsPage"));
const CategoriesPage = lazy(() => import("../pages/categories"));
const CartPage = lazy(() => import("../pages/CartPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const OrderPage = lazy(() => import("../pages/OrderPage"))

export const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />

            <Suspense fallback={<Rb_LoadingSpinner />}>
                <Routes>
                    {/* Public Auth Endpoint */}
                    <Route path="/auth" element={<AuthPage />} />

                    {/* Main Application Base */}
                    <Route path="/" element={<MainModule />}>
                        <Route index element={<HomePage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />

                        <Route path="/books-details" element={<BooksDetailsPage />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/wishlist" element={<WishListPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CartPage view="checkout" />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/orders" element={<OrderPage view="order-history" />} />
                            <Route path="/order-details" element={<OrderPage view="order-details" />} />

                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};