"use client";
import { useEffect, useState } from "react";
import useTrackInternet from "../../../hooks/track-internet/useTrackInternet";
import LoaderScreen from "./LoaderScreen";
import NoInternet from "./NoInternet";

export default function AppLoaderScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const isOnline = useTrackInternet();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOnline) return <NoInternet />;

  return (
    <>
      {children}

      {loading && (
        <div
          className={`fixed inset-0 z-9999 bg-white transition-opacity duration-500 ${
            loading
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <LoaderScreen />
        </div>
      )}
    </>
  );
}
