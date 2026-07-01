import { useCookies } from "react-cookie";
import { useCrypto } from "./use-crypto";

export const useUser = () => {
    const [cookies] = useCookies(["session"]);
    const { decrypt } = useCrypto;

    const getUser = () => {
        const session = decrypt(cookies.session);
        const poto = import.meta.env.VITE_POTO_PIN

        if(session === poto) return "Poto"

        return "Tonet"
    };

    return {
        getUser,
    };
};