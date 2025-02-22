import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Criss Cross",
  description: "Discover Criss Cross LTD, your one-stop shop for premium FMCG essentials! From cooking oil and soaps to rice, sugar, water, juices, and more, we deliver quality and convenience straight to your door. Shop now for everyday staples!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main className="dark:bg-gray-900 dark:text-gray-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
