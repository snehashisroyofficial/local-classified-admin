import Link from "next/link";
import { Suspense } from "react";

const NotFoundPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-8xl font-extrabold text-gray-800">404</h1>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Page not found.
          </h2>

          <p className="text-base text-gray-600 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been removed or is temporarily unavailable.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/ads/active"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default NotFoundPage;
