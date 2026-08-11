import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
    validateAddress: `${API_BASE_URL}/user/validateAddress`,
};

export const validateAddress = async (pincode: string) => {
    const response = await axios.post(
        endpoints.validateAddress,
        {
            pincode,
        },
        {
            withCredentials: true,
        }
    );

    return response.data;
};