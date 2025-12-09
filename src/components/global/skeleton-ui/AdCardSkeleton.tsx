const AdCardSkeleton = () => {
  return (
    <div className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b border-slate-100 animate-pulse w-full">
      {/* RESPONIVE IMAGE PLACEHOLDER 
          Matches the real card: Full width on mobile, fixed size on tablet+ 
      */}
      <div className="w-full sm:w-24 sm:h-24 md:w-32 md:h-24 shrink-0 bg-slate-200 rounded-lg aspect-video sm:aspect-square" />

      {/* CONTENT PLACEHOLDER */}
      <div className="flex-1 min-w-0 w-full space-y-3">
        {/* Title & Price Row */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded w-2/3 sm:w-1/3" />
          {/* Price Placeholder */}
        </div>

        {/* Description Line */}
        <div className="h-4 bg-slate-200 rounded w-3/4 sm:w-1/2" />

        {/* User & Date Metadata */}
        <div className="flex items-center space-x-4">
          <div className="h-5 bg-slate-200 rounded w-24" />
          <div className="h-5 bg-slate-200 rounded w-24" />
          <div className="h-5 bg-slate-200 rounded w-20" />
        </div>
      </div>

      {/* ACTION BUTTONS PLACEHOLDER 
          Matches real card: Grid on mobile, Flex on desktop
      */}
      <div className="w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <div className="grid grid-cols-3 sm:flex sm:flex-col md:flex-row gap-2">
          {/* On mobile: These fill the grid cells automatically (no width needed).
               On tablet/desktop: We enforce specific widths.
            */}
          <div className="h-9 bg-slate-200 rounded-md sm:w-20 md:w-24" />
          <div className="h-9 bg-slate-200 rounded-md sm:w-20 md:w-24" />
          <div className="h-9 bg-slate-200 rounded-md sm:w-20 md:w-24" />
        </div>
      </div>
    </div>
  );
};

export default AdCardSkeleton;
