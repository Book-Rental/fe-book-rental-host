import { useNavigate } from "react-router-dom";
import {
    Rb_Button,
    Rb_Text,
} from "@rentbook/rentbook-ui-lib";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";

function BecomeSellerPage() {
    const navigate = useNavigate();
    const userInfo = useSelector(
        (state: RootState) => state.auth.userInfo
    );

    useEffect(() => {
        if (userInfo?.isSeller) {
            navigate("/seller-dashboard", {
                replace: true,
            });
        }
    }, [userInfo, navigate]);


    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-4xl">📚</span>
            </div>

            <Rb_Text
                variant="h1"
                className="text-2xl font-bold sm:text-3xl"
            >
                Start Your Seller Journey
            </Rb_Text>

            <Rb_Text
                variant="p"
                className="mt-3 max-w-md text-sm text-gray-500 sm:text-base"
            >
                List your books for rent, manage orders,
                and start earning. It only takes a couple
                of minutes to get set up.
            </Rb_Text>

            <Rb_Button
                className="mt-8"
                onClick={() =>
                    navigate("/seller-onboarding/address")
                }
            >
                Get Started
            </Rb_Button>
        </div>
    );
}

export default BecomeSellerPage;