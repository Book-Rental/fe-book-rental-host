import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";

import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

const CART_WIDGET_URL = import.meta.env.VITE_CART_WIDGET;
const WIDGET_CONTAINER_ID = "cart-widget";

function CartPage() {
//   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!CART_WIDGET_URL) {
      console.error(
        "Widget URL is undefined. Check your environment variables.",
      );
      return;
    }

    // const handleWidgetLoading = (event: Event) => {
    //   const customEvent = event as CustomEvent;
    //   if (customEvent.detail !== undefined) {
    //     setIsLoading(customEvent.detail);
    //   }
    // };

    // window.addEventListener("widget-loading-status", handleWidgetLoading);

    loadWidget(CART_WIDGET_URL, WIDGET_CONTAINER_ID, {
      name: "Home_Widget",
    });
    return () => {
      removeWidget(WIDGET_CONTAINER_ID);
    //   window.removeEventListener("widget-loading-status", handleWidgetLoading);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[400px]">
      {/* {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-50">
          <Rb_LoadingSpinner />
        </div>
      )} */}

      <div
        id={WIDGET_CONTAINER_ID}
        // className={isLoading ? "invisible h-0 overflow-hidden" : "w-full block"}
      ></div>
    </div>
  );
}

export default CartPage;
