import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherFlow",
  description: "Free Open-Meteo current weather and seven-day forecast.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
