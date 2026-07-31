import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    loadWidget,
    removeWidget,
} from "../../utils/widgetLoader";
import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SELLER_DASHBOARD_WIDGET =
    import.meta.env.VITE_SELLER_DASHBOARD_WIDGET;

const WIDGET_CONTAINER_ID = "SellerDashboard-widget";

function SellerDashboardPage() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const userInfo = useSelector(
        (state: RootState) => state.auth.userInfo
    );

    const isSeller = userInfo?.isSeller;
    useEffect(() => {
        if (!isSeller) {
            navigate("/seller-onboarding", {
                replace: true,
            });
        }
    }, [isSeller, navigate]);

    useEffect(() => {
        if (!isSeller) {
            setIsLoading(false);
            return;
        }

        if (!SELLER_DASHBOARD_WIDGET) {
            console.error(
                "Seller Dashboard Widget URL is undefined."
            );
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleWidgetLoading = (event: any) => {
            if (event.detail !== undefined) {
                setIsLoading(event.detail);
            }
        };

        window.addEventListener(
            "widget-loading-status",
            handleWidgetLoading
        );

        const widgetParams = {
            name: "SellerDashboard",
            flag: "dashboard",
        };

        loadWidget(
            SELLER_DASHBOARD_WIDGET,
            WIDGET_CONTAINER_ID,
            widgetParams
        );

        return () => {
            removeWidget(WIDGET_CONTAINER_ID);

            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading
            );
        };
    }, [isSeller]);

    if (!isSeller) {
        return null;
    }

    return (
        <div className="relative min-h-[500px] w-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
                    <Rb_LoadingSpinner />
                </div>
            )}

            <div
                id={WIDGET_CONTAINER_ID}
                className={
                    isLoading
                        ? "invisible h-0 overflow-hidden"
                        : "block w-full"
                }
            />
        </div>
    );
}

export default SellerDashboardPage;