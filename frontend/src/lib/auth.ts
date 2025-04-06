import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const authenticatedFetch = async (router: AppRouterInstance, method: string, url: string, data = {}) => {
    try {
        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: method !== "GET" ? JSON.stringify(data) : undefined,
        });

        if (response.status === 401) {
            const refreshRes = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + 'refresh', {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" }
            });

            if (refreshRes.ok) {
                return await fetch(url, {
                    method: method,
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

            } else {
                await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + 'logout', {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" }
                });
                router.push("/login");
                toast.error("Session expired. Please login again.");
            }
        }

        return response;
    } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};