import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/services/Slices/authSlice";

import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

const AUTH_WIDGET_URL = import.meta.env.VITE_AUTH_WIDGET_URL;
const WIDGET_CONTAINER_ID = "auth-widget";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!AUTH_WIDGET_URL) {
      console.error(
        "Auth Widget URL is undefined. Check your environment variables.",
      );
      return;
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const handleWidgetLoading = (event: any) => {
      if (event.detail !== undefined) {
        setIsLoading(event.detail);
      }
    };
    window.addEventListener("widget-loading-status", handleWidgetLoading);

    // Define all parameters required by your widget here
    const widgetParams = {
      name: "Profile-widget",
      // view: "address", // Uncomment or add more parameters as needed
    };

    // Passing the configuration parameters directly into your loader
    loadWidget(AUTH_WIDGET_URL, WIDGET_CONTAINER_ID, widgetParams);

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
      window.removeEventListener("widget-loading-status", handleWidgetLoading);
      window.removeEventListener("login-widget-success", handleLoginSuccess);
      removeWidget(WIDGET_CONTAINER_ID);
    };
  }, [dispatch, navigate]);

  return (
    <div className="relative w-full min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 ">
          <Rb_LoadingSpinner />
        </div>
      )}

      <div
        id={WIDGET_CONTAINER_ID}
        className={isLoading ? "invisible h-0 overflow-hidden" : "w-full block"}
      ></div>
    </div>
  );
};

export default AuthPage;
