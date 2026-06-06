import { Libre_Caslon_Text, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon-text",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://www.jagraoncycleindustries.com"),
  title: {
    default: "Jagraon Cycle Industries — Precision Cycle Components Since 1975",
    template: "%s | Jagraon Cycle Industries",
  },
  description:
    "Jagraon Cycle Industries manufactures precision-engineered bicycle components — chains, brakes, hubs, and more — trusted by manufacturers worldwide since 1975.",
  keywords: [
    "cycle parts manufacturer",
    "bicycle components India",
    "Jagraon cycle industries",
    "cycle chain manufacturer",
    "bicycle brake manufacturer",
    "hub manufacturer",
    "cycle parts wholesale",
    "Punjab cycle industry",
  ],
  authors: [{ name: "Jagraon Cycle Industries" }],
  creator: "Jagraon Cycle Industries",
  publisher: "Jagraon Cycle Industries",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.jagraoncycleindustries.com",
    siteName: "Jagraon Cycle Industries",
    title: "Jagraon Cycle Industries — Precision Cycle Components Since 1975",
    description:
      "Precision-engineered bicycle components trusted by manufacturers worldwide. Chains, brakes, hubs, and more — made in India since 1975.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jagraon Cycle Industries — Precision Cycle Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jagraon Cycle Industries — Precision Cycle Components Since 1975",
    description:
      "Precision-engineered bicycle components trusted by manufacturers worldwide.",
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${libreCaslonText.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
