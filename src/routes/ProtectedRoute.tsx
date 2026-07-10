import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

export const ProtectedRoute = () => {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) ?? false;


    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};