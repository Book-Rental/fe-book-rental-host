import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiMapPin, FiPackage, FiPhone, FiTruck, FiUser, } from "react-icons/fi";

interface JourneyItem {
    event: string;
    status: string;
    eventAt: string;
}

interface PickupAgent {
    _id: string;
    fullName: string;
    phone: string;
    vehicleType: string;
}

interface ShipmentData {
    shipmentId: string;
    awbNumber: string;
    currentStatus: string;
    pickupAgent: PickupAgent | null;
    journeyDetails: JourneyItem[];
}

interface ShipmentResponse {
    status: string;
    message: string;
    data: ShipmentData;
}

const getStatusStyle = (status: string) => {
    const value = status.toLowerCase();

    if (
        value.includes("delivered") ||
        value.includes("completed")
    ) {
        return "bg-green-100 text-green-700";
    }

    if (
        value.includes("cancel") ||
        value.includes("failed") ||
        value.includes("return")
    ) {
        return "bg-red-100 text-red-700";
    }

    return "bg-blue-100 text-blue-700";
};

const ShipmentTrackingPage = () => {
    const { awbNumber: urlAwbNumber } = useParams();
    const navigate = useNavigate();

    const [awbNumber, setAwbNumber] = useState(
        urlAwbNumber || ""
    );

    const [shipment, setShipment] =
        useState<ShipmentData | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const adminUrl = import.meta.env.VITE_ADMIN_URL;

    const fetchShipment = async (awb: string) => {
        const trimmedAwb = awb.trim();

        if (!trimmedAwb) {
            setError("Please enter an AWB number.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setShipment(null);

            const response = await fetch(
                `${adminUrl}/api/shipment/shipmentStatuse/${trimmedAwb}`
            );

            if (!response.ok) {
                throw new Error("Shipment not found");
            }

            const result: ShipmentResponse =
                await response.json();

            if (result.status !== "Success") {
                throw new Error(
                    result.message ||
                    "Unable to fetch shipment"
                );
            }

            setShipment(result.data);

            navigate(
                `/track-shipment/${trimmedAwb}`,
                { replace: true }
            );
        } catch (err) {
            console.error(
                "Shipment fetch error:",
                err
            );

            setError(
                "Unable to find shipment. Please check the AWB number."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (urlAwbNumber) {
            setAwbNumber(urlAwbNumber);
            fetchShipment(urlAwbNumber);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlAwbNumber]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-7 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Track Your Shipment
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Enter your tracking ID to view your shipment journey
                    </p>
                </div>

                <div className="mx-auto  overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">

                    <div className="bg-blue-600 px-6 py-4">
                        <div className="flex items-center gap-3 text-white">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                                <FiPackage className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold sm:text-base">
                                    Shipment Tracking
                                </h2>

                                <p className="text-xs text-blue-100 sm:text-sm">
                                    Enter your AWB number below
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="px-6 py-5">
                        <div className="flex items-center gap-3">

                            <input
                                type="text"
                                value={awbNumber}
                                onChange={(e) =>
                                    setAwbNumber(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        fetchShipment(awbNumber);
                                    }
                                }}
                                placeholder="Enter AWB number"
                                className="h-11 min-w-0 flex-1 rounded-lg border border-gray-300 px-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() => fetchShipment(awbNumber)}
                                disabled={loading}
                                className="h-11 shrink-0 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Tracking..." : "Track Shipment"}
                            </button>

                        </div>

                        {error && (
                            <p className="mt-3 text-sm text-red-500">
                                {error}
                            </p>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="mx-auto mt-6 max-w-5xl animate-pulse space-y-5">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="h-24 rounded-xl bg-gray-200" />
                            <div className="h-24 rounded-xl bg-gray-200" />
                        </div>

                        <div className="h-28 rounded-xl bg-gray-200" />

                        <div className="h-96 rounded-xl bg-gray-200" />

                    </div>
                )}

                {shipment && !loading && (
                    <div className="mt-6 space-y-5">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <FiPackage className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-black-400">
                                            AWB Number
                                        </p>

                                        <p className="mt-1 text-base font-semibold text-black-400">
                                            {shipment.awbNumber}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <FiMapPin className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-black-400">
                                            Current Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                                shipment.currentStatus
                                            )}`}
                                        >
                                            {shipment.currentStatus}
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {shipment.pickupAgent && (
                            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <FiUser className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Pickup Agent
                                        </h2>

                                        <p className="text-xs text-black-500">
                                            Assigned delivery partner
                                        </p>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-5 border-t border-gray-100 pt-5 sm:grid-cols-3">

                                    <div className="flex items-center gap-3">
                                        <FiUser className="h-4 w-4 shrink-0 text-black-400" />

                                        <div>
                                            <p className="text-xs text-black-400">
                                                Name
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-black-800">
                                                {shipment.pickupAgent.fullName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FiPhone className="h-4 w-4 shrink-0 text-black-400" />

                                        <div>
                                            <p className="text-xs text-black-400">
                                                Phone
                                            </p>

                                            <a
                                                href={`tel:${shipment.pickupAgent.phone}`}
                                                className="mt-1 block text-sm font-semibold text-blue-600 hover:underline"
                                            >
                                                {shipment.pickupAgent.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FiTruck className="h-4 w-4 shrink-0 text-black-400" />

                                        <div>
                                            <p className="text-xs text-black-400">
                                                Vehicle
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {shipment.pickupAgent.vehicleType}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
                            <div className="mb-6 flex items-start justify-between gap-4">

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Shipment Journey
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                        Track the progress of your shipment
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                    {shipment.journeyDetails.length} Events
                                </span>

                            </div>

                            <div className="relative">

                                {shipment.journeyDetails.map(
                                    (item, index) => {
                                        const isLast =
                                            index ===
                                            shipment.journeyDetails.length - 1;

                                        const isCurrent =
                                            index ===
                                            shipment.journeyDetails.length - 1;

                                        return (
                                            <div
                                                key={`${item.event}-${item.eventAt}`}
                                                className="relative flex gap-4"
                                            >
                                                {!isLast && (
                                                    <div className="absolute left-[11px] top-6 h-[calc(100%-4px)] w-0.5 bg-blue-200" />
                                                )}

                                                <div
                                                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isCurrent
                                                            ? "bg-blue-600 ring-4 ring-blue-50"
                                                            : "bg-blue-500"
                                                        }`}
                                                >
                                                    <FiCheck className="h-3.5 w-3.5 text-white" />
                                                </div>

                                                <div
                                                    className={`flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${isLast ? "pb-1" : "pb-5"
                                                        }`}
                                                >
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {item.event}
                                                        </p>

                                                        <p className="mt-1 text-xs font-medium text-blue-600">
                                                            {item.status}
                                                        </p>
                                                    </div>

                                                    <p className="text-xs text-gray-400 sm:shrink-0 sm:pt-0.5 sm:text-right">
                                                        {formatDate(item.eventAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ShipmentTrackingPage;