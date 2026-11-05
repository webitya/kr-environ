import "./globals.css";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";

export const metadata = {
  title: "KR Environ Solutions | Advanced Wildlife Tech & Environmental Engineering",
  description:
    "Jharkhand-based environmental technology firm led by Sarika Gupta, partnering with Kyari Innovations to deliver ANIDERS, Re-Pulse Mats, KyNet Net Guns, and Smart Sticks across India.",
  keywords: [
    "KR Environ Solutions",
    "Kyari Innovations",
    "ANIDERS",
    "Wildlife conservation",
    "Human Animal Conflict",
    "Forestry Tech",
    "Net Gun",
    "Sarika Gupta",
    "Jharkhand Wildlife",
    "Ranchi Van Bhawan"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/fjdmukyv/video/upload/v1793781248/1104.mp4"
          type="video/mp4"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#4B5563]" suppressHydrationWarning>
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
