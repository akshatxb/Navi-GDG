const DataTableSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
          <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      {/* Table skeleton */}
      <div className="overflow-hidden rounded-lg border mx-4 lg:mx-6">
        <div className="w-full">
          {/* Table header */}
          <div className="bg-gray-100 flex p-3">
            <div className="w-10 h-6 bg-gray-200 rounded-md mr-2"></div>
            <div className="w-1/4 h-6 bg-gray-200 rounded-md mr-2"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded-md mr-2"></div>
            <div className="w-1/8 h-6 bg-gray-200 rounded-md mr-2"></div>
            <div className="w-1/8 h-6 bg-gray-200 rounded-md mr-2"></div>
            <div className="w-1/6 h-6 bg-gray-200 rounded-md mr-2"></div>
            <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
          </div>
          
          {/* Table rows */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex items-center p-3 border-t">
              <div className="w-10 h-5 bg-gray-200 rounded-md mr-2"></div>
              <div className="w-1/4 h-5 bg-gray-200 rounded-md mr-2"></div>
              <div className="w-1/6 h-5 bg-gray-200 rounded-md mr-2"></div>
              <div className="w-1/8 h-5 bg-gray-200 rounded-md mr-2"></div>
              <div className="w-1/8 h-5 bg-gray-200 rounded-md mr-2"></div>
              <div className="w-1/6 h-5 bg-gray-200 rounded-md mr-2"></div>
              <div className="w-10 h-5 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination skeleton */}
      <div className="flex items-center justify-between px-4">
        <div className="hidden lg:block w-40 h-5 bg-gray-200 rounded-md"></div>
        <div className="flex w-full items-center gap-8 lg:w-fit justify-end">
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-24 h-5 bg-gray-200 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-32 h-5 bg-gray-200 rounded-md"></div>
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gray-200 rounded-md"></div>
            <div className="size-8 bg-gray-200 rounded-md"></div>
            <div className="size-8 bg-gray-200 rounded-md"></div>
            <div className="size-8 bg-gray-200 rounded-md hidden lg:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableSkeleton;