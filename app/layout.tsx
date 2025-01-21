import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
//todo: update images and twitter links etc. in meta data
const frantz = localFont({
  src: "../public/fonts/frantz.woff",
  variable: "--font-frantz",
});

export const metadata: Metadata = {
  title: "Kristopher Sorensen - Creative Developer",
  description:
    "Explore immersive 3D web experiences, interactive UI design, and cutting-edge WebGL projects by Kristopher Sorensen. Specializing in high-performance visuals with React Three Fiber, GLSL, and interactive storytelling.",
  keywords:
    "Kristopher Sorensen, 3D web developer, creative developer, WebGL, Three.js, React Three Fiber, GLSL, interactive UI, front-end engineer, immersive web design",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Kristopher Sorensen - Creative Developer",
    description:
      "Award-winning creative developer specializing in 3D web experiences, React Three Fiber, and immersive UI design.",
    url: "https://kristopherdev.com",
    siteName: "Kristopher Sorensen Portfolio",
    images: [
      {
        url: "https://kristopherdev.com/preview-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kristopher Sorensen Portfolio - 3D Web Experiences",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle", // Optional
    creator: "@yourTwitterHandle",
    title: "Kristopher Sorensen - Creative Developer",
    description:
      "Building immersive and visually stunning 3D web experiences with React Three Fiber, WebGL, and GLSL.",
    images: ["https://kristopherdev.com/preview-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png" /> */}
      </head>
      <body>
        <main className={frantz.className}>{children}</main>
      </body>
    </html>
  );
}
