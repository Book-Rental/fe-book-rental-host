import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import Loading from "../../Component/Loading";

const HOME_WIDGET_URL = import.meta.env.VITE_HOMEPAGE_WIDGET;
const WIDGET_CONTAINER_ID = "home-widget";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!HOME_WIDGET_URL) {
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

        loadWidget(HOME_WIDGET_URL, WIDGET_CONTAINER_ID, {
            name: "Home_Widget",
        });

        return () => {
            removeWidget(WIDGET_CONTAINER_ID);
            // Clean up the event listener to avoid memory leaks
            window.removeEventListener("widget-loading-status", handleWidgetLoading);
        };
    }, []);

    return (
        <>
            {isLoading ? <Loading></Loading> : <div id={WIDGET_CONTAINER_ID}></div>}
        </>
    );
}

export default HomePage;
