import type { Metadata } from "next";
import { Inter, Newsreader, Arbutus_Slab } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const accent = Arbutus_Slab({
  weight: "400",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "MeetMind - AI-Powered Meeting Assistant",
  description:
    "MeetMind is an AI-powered meeting assistant that records, transcribes, and summarizes your meetings, freeing you to focus on what matters most - driving results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="en">
          <body
            className={`${inter.className} ${newsreader.variable} ${accent.variable} antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
