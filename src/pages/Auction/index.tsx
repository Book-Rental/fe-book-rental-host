import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";
const AUCTION_WIDGET_URL = import.meta.env.VITE_AUCTION_WIDGET;
const WIDGET_CONTAINER_ID = "auction-widget";

interface AuctionPageProps {
  view: "auction" | "bidding" | "bid-success";
}

function AuctionPage({ view }: AuctionPageProps) {
    const [isLoading, setIsLoading] = useState(true);
console.log(isLoading)
    useEffect(() => {
        if (!AUCTION_WIDGET_URL) {
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
        const widgetParams = {
            name: "auction-widget",
            view
        };
        loadWidget(AUCTION_WIDGET_URL, WIDGET_CONTAINER_ID, widgetParams);
        return () => {
            removeWidget(WIDGET_CONTAINER_ID);
            window.removeEventListener("widget-loading-status", handleWidgetLoading);
        };
    }, [view]);
    return (
        <>
            <div className="relative w-full min-h-[400px]">
                {/* {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
                        <Rb_LoadingSpinner />
                    </div>
                )} */}
                <div
                    id={WIDGET_CONTAINER_ID}
                    className={
                        "w-full block"
                    }
                ></div>
            </div>
        </>
    );
}

export default AuctionPage;