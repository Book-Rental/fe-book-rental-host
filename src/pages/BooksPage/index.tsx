import { useEffect } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
const CATEGORY_WIDGET = import.meta.env.VITE_CATEGORY_WIDGET;
const WIDGET_CONTAINER_ID = "Category-widget";


function BooksPage() {
  useEffect(() => {
    if (!CATEGORY_WIDGET) {
      console.error(
        "Widget URL is undefined. Check your environment variables.",
      );
      return;
    }
    loadWidget(CATEGORY_WIDGET, WIDGET_CONTAINER_ID, {
      name: "Category-widget",
    });

    return () => {
      removeWidget(WIDGET_CONTAINER_ID);
    };
  }, []);

  return <div id={WIDGET_CONTAINER_ID}></div>;
}

export default BooksPage;
