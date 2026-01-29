"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    )
      return;

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      registration.onupdatefound = () => {
        const worker = registration.installing;
        if (!worker) return;

        worker.onstatechange = () => {
          if (
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            window.dispatchEvent(new Event("pwa-update"));
          }
        };
      };
    });
  }, []);

  return null;
}
