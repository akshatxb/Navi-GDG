const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="@container/main flex flex-1 flex-col p-4">
            {children}
        </div>
    )
}

export default InventoryLayout
