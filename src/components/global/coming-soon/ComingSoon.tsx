import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-8xl font-extrabold text-gray-800">503</h1>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Coming Soon!
        </h2>

        <p className="text-base text-gray-600 max-w-md mx-auto">
          We are currently working on this page. Please check back later. Thanks
          for your patience.
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
  );
};

export default ComingSoon;
