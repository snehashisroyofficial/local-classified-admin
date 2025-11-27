"use client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider locale="en-GB">
        <Toaster richColors />

        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
