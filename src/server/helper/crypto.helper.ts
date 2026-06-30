import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY!;

export const encrypt = (data: unknown) => {
	return CryptoJS.AES.encrypt(
		JSON.stringify(data),
		SECRET_KEY
	).toString();
};

export const decryptHeaders = <T>(encrypted: string): T => {
	const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
	const decrypted = bytes.toString(CryptoJS.enc.Utf8);

	if (!decrypted) {
		throw new Error("Failed to decrypt data.");
	}

	return JSON.parse(decrypted) as T;
};