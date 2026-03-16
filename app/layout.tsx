import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sachin Kumar | Full Stack Developer",
  description:
    "Modern developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
      keywords: ["Sachin Kumar", "Full Stack Developer", "Next.js Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
