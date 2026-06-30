// In production the API is served same-origin under /api (see vercel.json).
// Locally, VITE_API_URL is read from .env.development.local.
const API_URL = import.meta.env.VITE_API_URL ?? "/api/"

export const useApi = {
	get: async <T>(path: string, pin: string): Promise<T> => {
		console.log(pin)
		const res = await fetch(`${API_URL}${path}`, {
			headers: {
				"Content-Type": "application/json",
				"X-secret": pin
			},
		});

		return await res.json();
	},

	post: async <T>(path: string, body: unknown, pin: string): Promise<T> => {
		const res = await fetch(`${API_URL}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-secret": pin
			},
			body: JSON.stringify(body),
		});

		return await res.json();
	},
};
