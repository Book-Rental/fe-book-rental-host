import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import { RootState } from "../../store/store";


const SITE_PROFIT_WIDGET_URL =
  import.meta.env.VITE_SITE_PROFIT_WIDGET_URL;

function SiteProfitPage() {
  const userInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  useEffect(() => {
    // Only superadmin can load this widget
    if (userInfo?.userType !== "superadmin") {
      return;
    }

    loadWidget(
      SITE_PROFIT_WIDGET_URL,
      "site-profit-widget"
    );

    return () => {
      removeWidget("site-profit-widget");
    };
  }, [userInfo]);

  if (userInfo?.userType !== "superadmin") {
    return null;
  }

  return (
    <div
      id="site-profit-widget"
      className="w-full min-h-screen"
    />
  );
}

export default SiteProfitPage;