import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/services/Slices/authSlice";
import Loading from "../../Component/Loading";

const AUTH_WIDGET_URL = import.meta.env.VITE_AUTH_WIDGET_URL;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const handleWidgetLoading = (event: any) => {
      if (event.detail !== undefined) {
        setIsLoading(event.detail);
      }
    };
    window.addEventListener("widget-loading-status", handleWidgetLoading);
    loadWidget(AUTH_WIDGET_URL, "auth-widget");

    const handleLoginSuccess = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { userInfo } = customEvent.detail;
      const {
        _id,
        firstName,
        lastName,
        email,
        userType,
        isVerified,
        status,
        addresses,
      } = userInfo;
      dispatch(
        loginSuccess({
          userInfo: {
            _id,
            firstName,
            lastName,
            email,
            userType,
            isVerified,
            status,
            addresses,
          },
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
      <div className="relative w-full min-h-[400px]">
        {isLoading && <Loading />}

        <div
          id="auth-widget"
          className={
            isLoading ? "invisible h-0 overflow-hidden" : "w-full block"
          }
        ></div>
      </div>
    </>
  );
};

export default AuthPage;
