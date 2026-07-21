import { useEffect, useState } from "react";
import { loadWidget, removeWidget } from "../../utils/widgetLoader";

import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";


const PROFILE_WIDGET = import.meta.env.VITE_PROFILE_WIDGET;
const WIDGET_CONTAINER_ID = "Profile-widget";

function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!PROFILE_WIDGET) {
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
   
        const widgetParams = {
            name: "Profile-widget",
            // view: "address"
        };

        loadWidget(PROFILE_WIDGET, WIDGET_CONTAINER_ID, widgetParams);
        return () => {
            removeWidget(WIDGET_CONTAINER_ID);
            window.removeEventListener("widget-loading-status", handleWidgetLoading);
        };
    }, []);

    return (
        <>
            <div className="relative w-full min-h-[400px]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
                        <Rb_LoadingSpinner />
                    </div>
                )}

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

export default ProfilePage;
