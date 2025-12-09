const ProfileSidebarSkeleton = () => {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-0 h-fit">
      {/* Skeleton Card */}
      <div className="relative bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 animate-pulse">
        {/* 1. HEADER SECTION */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 pr-20">
          {/* Avatar Skeleton */}
          <div className="shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200" />
          </div>

          {/* Name & Verified Badge Skeleton */}
          <div className="flex flex-col gap-2 w-full">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-32" />
            <div className="h-4 sm:h-5 bg-gray-200 rounded-full w-24" />
          </div>
        </div>

        {/* 2. STATUS BADGE SKELETON */}
        {/* Positioned absolutely to match original layout */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 h-6 w-20 bg-gray-200 rounded-full" />

        {/* 3. CONTACT DETAILS SKELETON */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            {/* Label "Seller Contacts" */}
            <div className="h-3 w-24 bg-gray-200 rounded mb-3" />

            <div className="space-y-3">
              {/* Email Row */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200 shrink-0" />
                <div className="h-4 w-full max-w-[180px] bg-gray-200 rounded" />
              </div>
              {/* Phone Row */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200 shrink-0" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* 4. METADATA FOOTER SKELETON */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="flex flex-col gap-2">
              {/* Last Login Row */}
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
              {/* Joined Row */}
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebarSkeleton;
