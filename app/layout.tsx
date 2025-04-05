import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhilNITS Mock Exam",
  description: "An online PhilNITS FE AM Mock Exam",
  icons: {
    icon: "/icon.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
