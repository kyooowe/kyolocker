import { createMiddleware } from "hono/factory";
import { decryptHeaders } from "./crypto.helper.js";

export const auth = createMiddleware(async (c, next) => {
    const secret = c.req.header("X-secret");

    if (!secret) {
        return c.json(
            {
                success: false,
                message: "Missing secret.",
            },
            401
        );
    }

    try {
        const code = decryptHeaders<string>(secret);

        const validSecrets = [
            process.env.POTO_PIN,
            process.env.TONET_PIN,
        ];

        if (!validSecrets.includes(code)) {
            return c.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                401
            );
        }

        await next();
    } catch(error: unknown) {
        const message =
                error instanceof Error ? error.message : "Unknown error occurred";

        return c.json(
            {
                success: false,
                message: message,
            },
            401
        );
    }
});
