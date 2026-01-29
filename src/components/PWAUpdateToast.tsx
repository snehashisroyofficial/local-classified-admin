"use client";

import { useEffect, useState } from "react";

export default function PWAUpdateToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(true);
    window.addEventListener("pwa-update", handler);
    return () => window.removeEventListener("pwa-update", handler);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0f172a",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 8,
      }}
    >
      New update available
      <button
        style={{ marginLeft: 12 }}
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
}
