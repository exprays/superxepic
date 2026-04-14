import "./globals.css";
import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: {
    default: "SuperXEpic | Motion, Design & Digital Mischief",
    template: "%s | SuperXEpic",
  },
  description: "SuperXEpic (SXE) is a global developer-focused and consumer-centric studio. We craft high-performance systems and cinematic digital worlds where mischief meets craft.",
  keywords: ["superxepic", "sxe", "creative studio", "developer-focused", "consumer-centric", "motion design", "high-performance systems", "API-driven design", "3D rendering", "digital experiences", "super x epic"],
  authors: [{ name: "SuperXEpic" }],
  creator: "SuperXEpic",
  publisher: "SuperXEpic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://superxepic.dev",
    siteName: "SuperXEpic",
    title: "SuperXEpic | Developer-Focused & Consumer-Centric Studio",
    description: "Creative studio crafting high-performance developer tools and cinematic consumer experiences. SXE: Where mischief meets craft.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SuperXEpic - Digital Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperXEpic | Digital Worlds & Motion Design",
    description: "Creative studio crafting digital worlds and high-end motion systems. SXE: Where mischief meets craft.",
    creator: "@superxepic",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SuperXEpic",
              "alternateName": ["SXE", "Super X Epic"],
              "url": "https://superxepic.dev",
              "logo": "https://superxepic.dev/favicon.ico",
              "sameAs": [
                "https://www.instagram.com/superxepic",
                "https://x.com/superxepic",
                "https://www.youtube.com/@superxepic"
              ],
              "description": "SuperXEpic is a global motion, design, and development studio creating cinematic digital worlds and high-performance systems.",
              "brand": {
                "@type": "Brand",
                "name": "SuperXEpic"
              }
            }),
          }}
        />
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
