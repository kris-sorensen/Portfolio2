import type { Metadata } from "next";
import "./globals.css";

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
        <main className="">{children}</main>
      </body>
    </html>
  );
}
