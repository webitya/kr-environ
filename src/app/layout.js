import "./globals.css";

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
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#4B5563]">
        {children}
      </body>
    </html>
  );
}
