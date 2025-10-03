import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Weather Dashboard - Real-time Weather Information",
  description: "Comprehensive weather dashboard with hourly forecasts, 7-day forecasts, air quality, weather alerts, and interactive maps",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://openweathermap.org" />
        <link rel="preconnect" href="https://api.openweathermap.org" />
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://openweathermap.org" />
        <link rel="dns-prefetch" href="https://api.openweathermap.org" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
