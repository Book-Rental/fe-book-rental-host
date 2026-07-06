import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainModule from "../modules/mainModule";

import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";

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
                </Route>
            </Routes>
        </>
    );
};
