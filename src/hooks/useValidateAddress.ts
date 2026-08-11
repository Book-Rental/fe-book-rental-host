import { useMutation } from "@tanstack/react-query";
import { validateAddress } from "../../api/addressApi";
export const useValidateAddress = () => {

    return useMutation({
        mutationFn: validateAddress,

    });
}