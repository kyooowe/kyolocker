const API_URL = import.meta.env.VITE_API_URL

export const useApi = {
	get: async <T>(path: string, pin: string): Promise<T> => {
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