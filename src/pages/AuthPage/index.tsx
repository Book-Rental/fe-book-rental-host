import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/services/Slices/authSlice";

const AUTH_WIDGET_URL = import.meta.env.VITE_AUTH_WIDGET_URL;

const AuthPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        loadWidget(AUTH_WIDGET_URL, "auth-widget");

        const handleLoginSuccess = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { token, userInfo } = customEvent.detail;

            dispatch(
                loginSuccess({
                    token,
                    userInfo,
                }),
            );
            navigate("/");
        };

        window.addEventListener("login-widget-success", handleLoginSuccess);

        return () => {
            window.removeEventListener("login-widget-success", handleLoginSuccess);
            removeWidget("auth-widget");
        };
    }, [dispatch, navigate]); // Added the missing dependencies here

    return (
        <>
            <div id='auth-widget'></div>
        </>
    );
};

export default AuthPage;
