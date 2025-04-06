"use client"

import { CheckCircle, FlaskConical, CalendarDays, Droplet, Lightbulb, CheckSquare, Wrench, BookOpen, Package, Map } from "lucide-react";
import { RecommendationData, Resources } from "./RecommendationSection";
import { IconSeedling } from "@tabler/icons-react";

const RecommendationCard = ({ data }: { data: RecommendationData | null }) => {

    return (
        <div className="mb-4 py-4 px-6">
            <div className="pb-2 border-b">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                        {data?.title || "No Title"}
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {data?.crop && (
                        <>
                            <span className="flex items-center">
                                <IconSeedling className="h-3 w-3 mr-1" />
                                {data.crop}
                            </span>
                            <span>•</span>
                        </>
                    )}
                    {data?.landarea && (
                        <>
                            <span className="flex items-center">
                                <Map className="h-3 w-3 mr-1" />
                                {data.landarea}
                            </span>
                            <span>•</span>
                        </>
                    )}
                    {data?.soilquality && (
                        <>
                            <span className="flex items-center">
                                <FlaskConical className="h-3 w-3 mr-1" />
                                {data.soilquality}
                            </span>
                            <span>•</span>
                        </>
                    )}
                    {data?.season && (
                        <span className="flex items-center">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {data.season}
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-4">
                {data?.description && (
                    <p className="text-sm mb-4">{data.description}</p>
                )}
                {data?.water_requirement && (
                    <div className="mb-4 p-2 bg-blue-50 rounded-md flex items-center">
                        <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                        <span className="text-sm text-blue-700">{data.water_requirement}</span>
                    </div>
                )}
                {data?.insights && (
                    <div className="mt-2 pt-3 border-t">
                        <div className="flex items-start mb-1">
                            <Lightbulb className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                            <p className="text-sm font-medium">Key Insights:</p>
                        </div>
                        {data.insights.length > 0 ? (
                            <ul className="text-sm space-y-1 mt-1 pl-6">
                                {data.insights.map((insight: string, index: number) => (
                                    <li key={index} className="list-disc text-sm text-muted-foreground">
                                        {insight}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground pl-6 mt-1">No insights available</p>
                        )}
                    </div>
                )}
                {data?.recommendations && data.recommendations.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                        <div className="flex items-start mb-1">
                            <CheckSquare className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                            <p className="text-sm font-medium">Recommendations:</p>
                        </div>
                        <ul className="text-sm space-y-1 mt-1 pl-6">
                            {data.recommendations.map((recommendation: string, index: number) => (
                                <li key={index} className="list-disc text-sm text-muted-foreground">
                                    {recommendation}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {data?.tools && data.tools.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                        <div className="flex items-start mb-1">
                            <Wrench className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                            <p className="text-sm font-medium">Suggested Tools:</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {data.tools.map((tool: string, index: number) => (
                                <span
                                    key={index}
                                    className="inline-block border border-gray-300 rounded px-2 py-1 text-xs"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {data?.resources && data.resources.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                        <div className="flex items-start mb-1">
                            <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                            <p className="text-sm font-medium">Resources:</p>
                        </div>
                        <div className="space-y-2 mt-2">
                            {data.resources.map((resource: Resources, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md"
                                >
                                    <Package className="h-3.5 w-3.5 text-blue-500" />
                                    <span className="text-sm font-medium">{resource.name}</span>
                                    <span className="ml-auto border border-gray-300 rounded px-2 py-1 text-xs">
                                        {resource.quantity}
                                    </span>
                                    <span className="bg-slate-200 text-slate-700 rounded px-2 py-1 text-xs hover:bg-slate-300">
                                        {resource.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCard;