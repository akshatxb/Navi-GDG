"use client"

import React, { useState } from "react";
import RecommendationAI from "./RecommendationsCard";
import RecommendationForm from "./RecommendationForm";
import RecommendationCardSkeleton from "./RecommendationCardSkeleton";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "@/lib/auth";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";

export type Resources = {
    name: string
    quantity: string
    category: string
}

export type RecommendationData = {
    title: string
    crop: string
    landarea: string
    soilquality: string
    season: string
    description: string
    insights: Array<string>
    resources: Array<Resources>
    tools: Array<string>
    water_requirement: string
    recommendations: Array<string>
    confidence: number
}

export type RecommendationFormData = {
    cropType: string
    landArea: string
    season: string
    soilQuality: string
}

const RecommendationSection = () => {

    const router = useRouter();
    const [ready, setReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);

    const fetchRecommendations = async (data: RecommendationFormData) => {
        const response = await authenticatedFetch(router, "POST", process.env.NEXT_PUBLIC_ASSISTANT_API_URL + "generate", data);
        if (!response) {
            setLoading(false);
            return;
        }
        if (!response.ok) {
            setLoading(false);
            toast.error("Error fetching recommendations. Please try again later.");
            return;
        }
        const result = await response.json();
        setRecommendations(result.data);
        setLoading(false);
    };

    const onSubmit: SubmitHandler<RecommendationFormData> = async (data: RecommendationFormData) => {
        setReady(true);
        setLoading(true);
        await fetchRecommendations(data);
    };

    return (
        <>
            {ready ? (
                <div className="flex flex-col flex-1">
                    {loading ? (
                        <RecommendationCardSkeleton />
                    ) : (
                        <RecommendationAI data={recommendations} />
                    )}
                </div>
            ) : (
                <RecommendationForm submitHandler={onSubmit} />
            )}
        </>
    );
};

export default RecommendationSection;
