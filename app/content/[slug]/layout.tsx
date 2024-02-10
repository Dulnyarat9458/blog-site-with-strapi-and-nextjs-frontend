import type { Metadata } from "next";
import { Fira_Code as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"


import { Header } from "@/components/header";


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
})

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
    </>
  )
}
