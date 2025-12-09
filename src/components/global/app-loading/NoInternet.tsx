import { RefreshCcw, WifiOff } from "lucide-react";

const NoInternet = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl text-center space-y-4 mx-4">
        {/* Icon Container */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <WifiOff className="h-8 w-8 text-red-500" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Connection Lost</h1>
          <p className="text-slate-500">
            Oops! It looks like you&apos;re offline. Please check your internet
            connection and try again.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => window?.location.reload()}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 mt-2 text-sm font-semibold text-white transition-all bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-95"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default NoInternet;
