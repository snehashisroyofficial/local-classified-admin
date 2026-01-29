export const dynamic = "force-dynamic";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import AppProviders from "./providers";
import LayoutProvider from "../layout/Layout";
import "leaflet/dist/leaflet.css";
import manifest from "./infoApp";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${manifest().name}"`,
    default: "Welcome to Admin Dashboard",
  },
  manifest: "/manifest.json",
  description: `${manifest().description}`,
  icons: {
    icon: "/favicon.png",
  },
};
export const viewport: Viewport = {
  themeColor: "#000000", // Matches manifest theme_color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming (optional, makes it feel like an app)
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <AppProviders>
          <LayoutProvider>{children}</LayoutProvider>
        </AppProviders>
      </body>
    </html>
  );
}
