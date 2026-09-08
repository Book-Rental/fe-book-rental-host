import { useEffect, useState, useRef } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

const CART_WIDGET_URL = import.meta.env.VITE_CART_WIDGET;

interface CartPageProps {
  view?: "cart" | "checkout" | "success";
  WIDGET_CONTAINER_ID?: string;
}

function CartPage({ view = "cart", WIDGET_CONTAINER_ID = "cart-widget" }: CartPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // 1. Maintain a ref to a stable parent container that React owns.
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CART_WIDGET_URL) {
      console.error(
        "Widget URL is undefined. Check your environment variables.",
      );
      return;
    }

    const handleWidgetLoading = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail !== undefined) {
        setIsLoading(customEvent.detail);
      }
    };

    window.addEventListener("widget-loading-status", handleWidgetLoading);

    // 2. Dynamically create the widget element inside vanilla JS
    const widgetElement = document.createElement("div");
    widgetElement.id = WIDGET_CONTAINER_ID;
    widgetElement.className = isLoading ? "invisible h-0 overflow-hidden" : "w-full block";

    if (parentRef.current) {
      parentRef.current.appendChild(widgetElement);
    }

    const widgetParams = {
      name: WIDGET_CONTAINER_ID,
      view: view
    };

    loadWidget(CART_WIDGET_URL, WIDGET_CONTAINER_ID, widgetParams);

    return () => {
      window.removeEventListener("widget-loading-status", handleWidgetLoading);

      // 3. FIX: Push the widget's root unmount execution out of the current React render stack
      setTimeout(() => {
        try {
          removeWidget(WIDGET_CONTAINER_ID);
        } catch (error) {
          console.warn("Failed to cleanly unmount widget root:", error);
        }

        // 4. Safely discard the DOM element container after unmounting is complete
        widgetElement.remove();
      }, 0);
    };
  }, [view, WIDGET_CONTAINER_ID]);

  // Keep layout styling synchronized
  useEffect(() => {
    const target = document.getElementById(WIDGET_CONTAINER_ID);
    if (target) {
      target.className = isLoading ? "invisible h-0 overflow-hidden" : "w-full block";
    }
  }, [isLoading, WIDGET_CONTAINER_ID]);

  return (
    <div className="relative w-full min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 ">
          <Rb_LoadingSpinner />
        </div>
      )}

      {/* React safely tracks this node structure shell */}
      <div ref={parentRef} className="w-full"></div>
    </div>
  );
}

export default CartPage;
