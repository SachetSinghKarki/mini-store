import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Navbar } from "@/components/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Store",
  description: "Minimal is better",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background">
        <TRPCReactProvider>
          <Navbar />
          <main className="flex-1">
            <NuqsAdapter>

            {children}
            </NuqsAdapter>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}