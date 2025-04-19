
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import { ToastContainer } from "react-toastify";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SumFlood",
  description: "SumFlood is a new generation news platform ",
  icons: {
    icon: "/assets/images/logo.png", 
    shortcut: "/favicon.ico", 
    apple: "/apple-touch-icon.png", 
  },
  keywords: ["sumflood", "haber", "yapay zeka haber","gündem","alibarandemir"],
  robots:{
    index:true,
    follow:true
  },
  alternates:{
    canonical:"http://localhost:3000"
  }

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
          

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}>
        <ThemeProvider attribute="class">
        <StoreProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </StoreProvider>
    
        </ThemeProvider>

     
       
      </body>
    </html>
  );
}
