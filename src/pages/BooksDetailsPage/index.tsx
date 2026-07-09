import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
import Loading from "../../Component/Loading";

const PDP_WIDGET_URL = import.meta.env.VITE_PDP_WIDGET;
const WIDGET_CONTAINER_ID = "pdp-widget";

function BooksDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!PDP_WIDGET_URL) {
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

        loadWidget(PDP_WIDGET_URL, WIDGET_CONTAINER_ID, {
            name: "Home_Widget",
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

export default BooksDetailsPage;
