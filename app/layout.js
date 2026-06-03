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
  title: "Jagraon Cycle Industries",
  description: "Precision engineered components for the next century of transport.",
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
