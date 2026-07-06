import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import Loading from "../../Component/Loading";
const CATEGORY_WIDGET = import.meta.env.VITE_CATEGORY_WIDGET;
const WIDGET_CONTAINER_ID = "Category-widget";

function BooksPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!CATEGORY_WIDGET) {
      console.error(
        "Widget URL is undefined. Check your environment variables.",
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
    loadWidget(CATEGORY_WIDGET, WIDGET_CONTAINER_ID, {
      name: "Category-widget",
    });

    return () => {
      removeWidget(WIDGET_CONTAINER_ID);
      window.removeEventListener("widget-loading-status", handleWidgetLoading);
    };
  }, []);

  return (
    <>
      <div className="relative w-full min-h-[400px]">
        {isLoading && <Loading />}

        <div
          id={WIDGET_CONTAINER_ID}
          className={
            isLoading ? "invisible h-0 overflow-hidden" : "w-full block"
          }
        ></div>
      </div>
    </>
  );
}

export default BooksPage;
