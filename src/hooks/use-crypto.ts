import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const useCrypto = {
    encrypt: (value: unknown): string => {
        return CryptoJS.AES.encrypt(
            JSON.stringify(value),
            SECRET_KEY
        ).toString();
    },

    decrypt: <T>(encrypted: string): T => {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            throw new Error("Failed to decrypt data.");
        }

        return JSON.parse(decrypted) as T;
    },
};