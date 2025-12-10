import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import AppProviders from "./providers";
import LayoutProvider from "../layout/Layout";
import "leaflet/dist/leaflet.css";
import manifest from "./manifest";
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${manifest().name}"`,
    default: "Welcome to Admin Dashboard",
  },
  description: `${manifest().description}`,
  icons: {
    icon: "/favicon.png",
  },
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
