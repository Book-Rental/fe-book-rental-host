import { useEffect, useRef, useState } from "react";
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
import { useValidateAddress } from "../../hooks/useValidateAddress";
import { showToast } from "../../utils/ToastFunction";

const PROFILE_WIDGET =
    import.meta.env.VITE_PROFILE_WIDGET;

const WIDGET_CONTAINER_ID =
    "Seller-Address-widget";

function SellerAddressPage() {
    const useInfo = useSelector((state: RootState) => state.auth.userInfo)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate: validateAddress } = useValidateAddress();

    useEffect(() => {
        if (useInfo?.isSeller) {
            navigate("/seller-dashboard", {
                replace: true,
            });
        }
    }, [useInfo, navigate]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [widgetError, setWidgetError] =
        useState<string | null>(null);

    const [isValidatingAddress, setIsValidatingAddress] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [selectedAddress, setSelectedAddress] =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useState<any>(null);

    // Guards against the widget dispatching duplicate/rapid-fire
    // "profile-address-selected" events for the same address.
    const isValidationInFlight = useRef(false);
    const lastValidatedPincode = useRef<string | null>(null);

    useEffect(() => {
        if (!PROFILE_WIDGET) {
            console.error(
                "Profile widget URL is undefined."
            );
            setIsLoading(false);
            setWidgetError(
                "Address widget is unavailable right now. Please try again later."
            );
            return;
        }

        const handleWidgetLoading = (event: Event) => {
            const customEvent = event as CustomEvent<boolean>;
            if (customEvent.detail !== undefined) {
                setIsLoading(customEvent.detail);
            }
        };

        const handleAddressSelected = (event: Event) => {
            const customEvent = event as CustomEvent<{
                zipCode?: string;
                [key: string]: unknown;
            }>;
            const address = customEvent.detail;

            if (!address?.zipCode) {
                showToast(
                    "Selected address does not contain a valid ZIP code.",
                    "error"
                );
                return;
            }

            const pincode = address.zipCode;

            // Ignore re-fires for the same pincode while a validation is
            // already in flight, or immediately after it just succeeded.
            if (
                isValidationInFlight.current ||
                pincode === lastValidatedPincode.current
            ) {
                return;
            }

            isValidationInFlight.current = true;
            lastValidatedPincode.current = pincode;
            setIsValidatingAddress(true);

            // Don't let the user Continue with a stale selection while the
            // new one is being (re)validated.
            setSelectedAddress(null);

            validateAddress(pincode, {
                onSuccess: (response) => {
                    if (response?.data?.isValid === true) {
                        setSelectedAddress(address);
                        showToast(
                            "Address validated successfully.",
                            "success"
                        );
                    } else {
                        showToast(
                            response?.data?.message ||
                            "The selected address is not serviceable.",
                            "error"
                        );
                        // Allow retrying the same pincode later.
                        lastValidatedPincode.current = null;
                    }

                    isValidationInFlight.current = false;
                    setIsValidatingAddress(false);
                },

                onError: (error) => {
                    console.error(
                        "Address validation failed:",
                        error
                    );

                    showToast(
                        "Unable to validate the address. Please try again.",
                        "error"
                    );

                    isValidationInFlight.current = false;
                    lastValidatedPincode.current = null;
                    setIsValidatingAddress(false);
                },
            });
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

        try {
            loadWidget(
                PROFILE_WIDGET,
                WIDGET_CONTAINER_ID,
                widgetParams
            );
        } catch (error) {
            console.error("Failed to load address widget:", error);
            setIsLoading(false);
            setWidgetError(
                "Something went wrong loading the address widget. Please refresh the page."
            );
        }

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
    }, [validateAddress]);

    const handleContinue = async () => {
        if (!selectedAddress || isSubmitting) return;

        const userId = useInfo?._id;

        if (!userId) {
            console.error("No user id found — cannot become seller.");
            showToast(
                "We couldn't find your account details. Please sign in again.",
                "error"
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedUser = await becomeSeller(userId, selectedAddress);
            dispatch(updateUser(updatedUser));
            navigate("/seller-dashboard");
        } catch (err) {
            console.error("Failed to register as seller:", err);
            showToast(
                "We couldn't complete your seller registration. Please try again.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
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

            {widgetError ? (
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {widgetError}
                </div>
            ) : (
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
            )}

            <div className="mt-8 flex justify-end">
                <Rb_Button
                    disabled={
                        !selectedAddress ||
                        isValidatingAddress ||
                        isSubmitting
                    }
                    onClick={handleContinue}
                >
                    {isSubmitting ? "Submitting..." : "Continue"}
                </Rb_Button>
            </div>
        </div>
    );
}

export default SellerAddressPage;