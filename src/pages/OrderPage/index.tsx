import { useEffect } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";

// import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

const ORDER_WIDGET_URL = import.meta.env.VITE_ORDER_WIDGET;
const WIDGET_CONTAINER_ID = "Order-widget";

interface OrderPageProps {
    view: "order-history" | "order-details" | "book-details";
}
function OrderPage({ view }: OrderPageProps) {
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!ORDER_WIDGET_URL) {
            console.error(
                "Widget URL is undefined. Check your environment variables.",
            );
            return;
        }

        // const handleWidgetLoading = (event: Event) => {
        //     const customEvent = event as CustomEvent;
        //     if (customEvent.detail !== undefined) {
        //         setIsLoading(customEvent.detail);
        //     }
        // };

        // window.addEventListener("widget-loading-status", handleWidgetLoading);

        // here we will pass the attribute which we want to pass to the child element like name 
        const widgetParams = {
            name: "order-widget",
            view: view,
        };
        loadWidget(ORDER_WIDGET_URL, WIDGET_CONTAINER_ID, widgetParams);

        return () => {
            removeWidget(WIDGET_CONTAINER_ID);
            // window.removeEventListener("widget-loading-status", handleWidgetLoading);
        };
    }, [view]);

    return (
        <div className="relative w-full min-h-[400px]">
            {/* {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 ">
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

export default OrderPage