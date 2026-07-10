import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    // 1. Listen to the current URL location path change
    const { pathname } = useLocation();

    useEffect(() => {
        // 2. Automatically jump to top when URL changes
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [pathname]); // Fires every single time the route path updates

    return null; // This component has no visual HTML layout
};