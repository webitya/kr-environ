import { Suspense } from "react";
import "./globals.css";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import TopProgressBar from "@/components/common/TopProgressBar";

export const metadata = {
  metadataBase: new URL('https://www.krenviron.in'),
  title: "KR Environ Solutions | Advanced Wildlife Tech & Environmental Engineering",
  description:
    "Jharkhand-based environmental consulting and conservation technology firm led by Sarika Gupta, delivering statutory EC/FC clearances, GIS drone mapping, and wildlife conflict mitigation solutions across India.",
  keywords: [
    "KR Environ Solutions",
    "Environmental Clearance",
    "ANIDERS",
    "Wildlife conservation",
    "Human Animal Conflict",
    "Forestry Tech",
    "Net Gun",
    "Sarika Gupta",
    "Jharkhand Wildlife",
    "Ranchi Van Bhawan",
    "Webitya"
  ],
  authors: [
    { name: "Sarika Gupta (Proprietor)", url: "https://www.krenviron.in" },
    { name: "Webitya (Aditya Kumar)", url: "https://www.webitya.com" }
  ],
  creator: "Webitya",
  publisher: "KR Environ Solutions",
  other: {
    "designer": "Webitya - Aditya Kumar",
    "developer": "Webitya (https://www.webitya.com)",
    "developer-email": "info@webitya.com",
    "developer-phone": "+91 9693245941"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.krenviron.in/#website",
      "url": "https://www.krenviron.in/",
      "name": "KR Environ Solutions",
      "description": "Advanced Wildlife Tech & Environmental Engineering",
      "publisher": {
        "@type": "Organization",
        "name": "KR Environ Solutions",
        "url": "https://www.krenviron.in/"
      },
      "creator": {
        "@type": "Organization",
        "name": "Webitya",
        "url": "https://www.webitya.com",
        "email": "info@webitya.com",
        "telephone": "+91 9693245941",
        "founder": {
          "@type": "Person",
          "name": "Aditya Kumar"
        },
        "description": "At Webitya, we empower ambitious businesses, students, and working professionals to scale through clean software architecture, search-first strategy, and high-performance digital marketing."
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="author" href="/humans.txt" />
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/fjdmukyv/video/upload/v1793910406/1104_1.mp4"
          type="video/mp4"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#4B5563]" suppressHydrationWarning>
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
