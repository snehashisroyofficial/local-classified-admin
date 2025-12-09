"use client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppLoaderScreen from "../components/global/app-loading/AppLoaderScreen";

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
        <AppLoaderScreen>{children}</AppLoaderScreen>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
