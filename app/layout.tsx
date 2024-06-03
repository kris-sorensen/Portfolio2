import type { Metadata } from "next";

import "./globals.css";
import Header from "./components/Header/Header";
import localFont from "next/font/local";
// import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

// * Google fonts
// import { Roboto } from "next/font/google";
// const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

const orange = localFont({
  src: "../public/fonts/BDOrange.woff2",
  variable: "--font-orange",
});

const citrine = localFont({
  src: "../public/fonts/citrine.woff2",
  variable: "--font-citrine",
});

// * every page needs proper metadata
export const metadata: Metadata = {
  title: "Happy Tails Dog Boarding and Dog Daycare",
  description: "Dog boarding and dog daycare in Lehi, Utah.",
  openGraph: {
    // * for sharing on social media
    title: "Happy Tails Dog Boarding and Dog Daycare",
    description: "Dog boarding and dog daycare in Lehi, Utah.",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={"winter"}>
      {/* <GoogleAnalyticsScript/> */}
      <body className={`${orange.variable} ${citrine.variable}`}>
        <Header />
        <main className="">
          {children}
          {modal}
        </main>
      </body>
    </html>
  );
}
