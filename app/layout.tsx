import type { Metadata } from "next";
import { Fira_Code as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

import { Header } from "@/components/header";
import { cn } from "../lib/utils"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
})


export const metadata: Metadata = {
  title: "My Site",
  description: "this is my site that get content from strapi",
};


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="container mx-auto min-h-screen-58">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
