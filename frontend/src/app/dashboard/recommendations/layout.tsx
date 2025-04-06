const RecommendationsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col">
                <div className="flex flex-1 justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default RecommendationsLayout
