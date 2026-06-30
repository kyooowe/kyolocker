import { toast } from "sonner";
import { useCallback, useState } from "react";

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text: string, message?: string) => {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            toast.success(message ?? "Copied to clipboard");

            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error("Copy failed:", error);
            toast.error("Failed to copy");
            setCopied(false);
        }
    }, []);

    return {
        copy,
        copied,
    };
};