import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cosmocloud | Employee CRUD",
  description: "Cosmocloud Employee Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
      <Providers>
      <Header />
        <Toaster/>
        {children}
      </Providers>
      </body>
    </html>
  );
}
