"use client";

import { useEffect } from "react";

export default function ErrorFallbackUI({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // send the error to the error logging service
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen uppercase text-3xl font-medium text-red-500">
      {error?.message || "An Error Occured"}
    </div>
  );
}
