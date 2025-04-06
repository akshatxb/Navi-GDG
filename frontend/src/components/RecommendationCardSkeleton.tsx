const RecommendationCardSkeleton = () => {
    return (
        <div className="mb-4 p-4 animate-pulse">
            <div className="pb-2 border-b">
                <div className="flex justify-between items-start">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-1">
                            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="w-2 bg-gray-300 h-0.5 ml-1"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>

                <div className="mb-4 p-2 bg-blue-50 rounded-md flex items-center">
                    <div className="h-5 w-5 mr-2 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>


                <div className="mt-2 pt-3 border-t">
                    <div className="flex items-start mb-1">
                        <div className="h-4 w-4 mr-2 mt-0.5 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="space-y-1 mt-1 pl-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>


                <div className="mt-4 pt-3 border-t">
                    <div className="flex items-start mb-1">
                        <div className="h-4 w-4 mr-2 mt-0.5 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="space-y-1 mt-1 pl-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>


                <div className="mt-4 pt-3 border-t">
                    <div className="flex items-start mb-1">
                        <div className="h-4 w-4 mr-2 mt-0.5 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-36"></div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 bg-gray-200 rounded w-20"></div>
                        ))}
                    </div>
                </div>


                <div className="mt-4 pt-3 border-t">
                    <div className="flex items-start mb-1">
                        <div className="h-4 w-4 mr-2 mt-0.5 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </div>
                    <div className="space-y-2 mt-2">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md">
                                <div className="h-3.5 w-3.5 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="ml-auto h-6 bg-gray-200 rounded w-12"></div>
                                <div className="h-6 bg-gray-200 rounded w-16"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendationCardSkeleton
