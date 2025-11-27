import { Suspense } from "react";

const NotFoundPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h2>Page Not Found</h2>
    </Suspense>
  );
};

export default NotFoundPage;
