import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import StudioGate from "@/components/StudioGate";

export const bodyFont = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "My Store",
  description: "Modern Ecommerce Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <StudioGate>{children}</StudioGate>
      </body>
    </html>
  );
}
