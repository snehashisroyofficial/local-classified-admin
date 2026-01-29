const ViewAdDetailsSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50/50 pb-10">
      {/* Header Skeleton */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-2">
              {/* Title */}
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              {/* ID */}
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* LEFT CONTENT COLUMN (8/12) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden pb-6">
            {/* Image Gallery Skeleton */}
            <div className="w-full bg-gray-200 min-h-[250px] sm:min-h-[400px] animate-pulse" />

            <div className="px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Title */}
                  <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />

                  {/* Metadata pills */}
                  <div className="flex gap-3">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* Price */}
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse shrink-0" />
              </div>

              <hr className="my-6 border-gray-100" />

              {/* Description Lines */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Attributes Grid Skeleton */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 h-16 animate-pulse"
                  >
                    <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>

              {/* Tags Skeleton */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="h-3 w-10 bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Skeleton */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="h-5 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="aspect-video sm:aspect-21/9 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded mt-4 animate-pulse" />
          </div>
        </div>

        {/* RIGHT SIDEBAR COLUMN (4/12) */}
        <div className="lg:col-span-3 space-y-6 mt-6 lg:mt-0 lg:sticky lg:top-8">
          {/* Seller Profile Skeleton */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-5">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse shrink-0" />
              <div className="space-y-2 w-full">
                {/* Name */}
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                {/* Verified Badge */}
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="space-y-3">
              {/* Contact Rows */}
              <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>

            {/* Buttons */}
            <div className="mt-5 pt-5 border-t border-gray-100 flex gap-3">
              <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewAdDetailsSkeleton;
