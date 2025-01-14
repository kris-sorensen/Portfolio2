import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const frantz = localFont({
  src: "../public/fonts/frantz.woff",
  variable: "--font-frantz",
});

// * every page needs proper metadata
export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  openGraph: {
    // * for sharing on social media
    title: "Title",
    description: "Description",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <main className={`${inter.variable} font-sans`}>{children}</main> */}
        <main className={frantz.className}>{children}</main>
      </body>
    </html>
  );
}
