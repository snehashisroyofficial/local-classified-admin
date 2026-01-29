"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!prompt) return null;

  return (
    <button
      style={{
        position: "fixed",
        bottom: 80,
        right: 20,
        padding: "10px 16px",
      }}
      onClick={() => {
        prompt.prompt();
        setPrompt(null);
      }}
    >
      Install App
    </button>
  );
}
