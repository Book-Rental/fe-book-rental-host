import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Rb_Button,
    Rb_LoadingSpinner,
} from "@rentbook/rentbook-ui-lib";
import {
    loadWidget,
    removeWidget,
} from "../../utils/widgetLoader";
import { becomeSeller } from "../../../api/sellerApi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/services/Slices/authSlice";
import { RootState } from "../../store/store";

const PROFILE_WIDGET =
    import.meta.env.VITE_PROFILE_WIDGET;

const WIDGET_CONTAINER_ID =
    "Seller-Address-widget";

function SellerAddressPage() {
    const useInfo = useSelector((state: RootState) => state.auth.userInfo)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (useInfo?.isSeller) {
            navigate("/seller-dashboard", {
                replace: true,
            });
        }
    }, [useInfo, navigate]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [selectedAddress, setSelectedAddress] =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useState<any>(null);

    useEffect(() => {
        if (!PROFILE_WIDGET) {
            console.error(
                "Profile widget URL is undefined."
            );
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleWidgetLoading = (event: any) => {
            if (event.detail !== undefined) {
                setIsLoading(event.detail);
            }
        };

        const handleAddressSelected = (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            event: any
        ) => {
            setSelectedAddress(event.detail);
        };

        window.addEventListener(
            "widget-loading-status",
            handleWidgetLoading
        );

        window.addEventListener(
            "profile-address-selected",
            handleAddressSelected
        );

        const widgetParams = {
            name: "Profile-widget",
            view: "address",
        };

        loadWidget(
            PROFILE_WIDGET,
            WIDGET_CONTAINER_ID,
            widgetParams
        );

        return () => {
            removeWidget(WIDGET_CONTAINER_ID);

            window.removeEventListener(
                "widget-loading-status",
                handleWidgetLoading
            );

            window.removeEventListener(
                "profile-address-selected",
                handleAddressSelected
            );
        };
    }, []);

    const handleContinue = async () => {
        if (!selectedAddress) return;
        try {
            const userId = useInfo?._id;

            if (!userId) {
                console.error("No user id found — cannot become seller.");
                return;
            }

            const updatedUser = await becomeSeller(userId, selectedAddress);


            dispatch(updateUser(updatedUser));
            navigate("/seller-dashboard");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="mx-auto max-w-5xl p-6">
            <h1 className="mb-2 text-3xl font-bold">
                Seller Address
            </h1>

            <p className="mb-6 text-gray-500">
                Select your address or add a new one.
            </p>

            <div className="relative min-h-[450px]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                        <Rb_LoadingSpinner />
                    </div>
                )}

                <div
                    id={WIDGET_CONTAINER_ID}
                    className={
                        isLoading
                            ? "invisible h-0 overflow-hidden"
                            : "block"
                    }
                />
            </div>

            <div className="mt-8 flex justify-end">
                <Rb_Button
                    disabled={!selectedAddress}
                    onClick={handleContinue}
                >
                    Continue
                </Rb_Button>
            </div>
        </div>
    );
}

export default SellerAddressPage;