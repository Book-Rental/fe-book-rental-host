import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainModule from "../modules/mainModule";

import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
import TestPage from "../pages/TestPage";
import WishListPage from "../pages/WishListPage";
import BooksDetailsPage from "../pages/BooksDetailsPage";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<>loading .....</>}>
                            <MainModule />
                        </Suspense>
                    }
                >
                    <Route index element={<HomePage />}></Route>
                    <Route path="/books" element={<BooksPage />}></Route>
                    <Route path="/books/:id" element={<BooksDetailsPage/>}></Route>
                    <Route path="/wishlist" element={<WishListPage />}></Route>
                    <Route path="/test" element={<TestPage />}></Route>
                </Route>
            </Routes>
        </>
    );
};
